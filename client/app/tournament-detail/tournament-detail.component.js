'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './tournament-detail.routes';
import _ from 'lodash';

export class TournamentDetailComponent {
  constructor($uibModal, $q, $state, $stateParams, $timeout, TournamentService, TournamentPlayerNoteService,
              TournamentPlayerService, PlayerService, MatchService, MatchResultService, TournamentViewService, StateUtil) {
    'ngInject';
    this.$q = $q;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.$uibModal = $uibModal;
    this.TournamentService = TournamentService;
    this.TournamentPlayerNoteService = TournamentPlayerNoteService;
    this.TournamentPlayerService = TournamentPlayerService;
    this.PlayerService = PlayerService;
    this.MatchService = MatchService;
    this.MatchResultService = MatchResultService;
    this.TournamentViewService = TournamentViewService;

    this.tournamentId = this.$stateParams.tournamentId;
    this.leagueCode = StateUtil.getLeagueCodeFromUrl();
  }

  $onInit() {
    this.$q.all([
      this.TournamentService.get({id: this.tournamentId, leagueCode: this.leagueCode}).$promise,
      this.TournamentPlayerService.query({tournamentId: this.tournamentId, leagueCode: this.leagueCode}).$promise,
      this.PlayerService.query({leagueCode: this.leagueCode}).$promise,
      this.MatchService.query({tournamentId: this.tournamentId, leagueCode: this.leagueCode}).$promise
    ]).then(response => {
      this.tournament = response[0];

      const tournamentPlayers = _.orderBy(response[1], ['score'], ['desc']);
      this.players = response[2];
      this.matches = _.orderBy(response[3], ['createdAt'], ['desc']);

      this.playersById = {};
      _.each(this.players, player => {
        this.playersById[player._id] = player;
      });

      this.tournamentPlayers = _.map(tournamentPlayers, (tournamentPlayer, index) => {
        const player = angular.copy(tournamentPlayer);
        player.name = this.playersById[player.playerId].name;
        player.score = player.score || 0;
        player.rank = index + 1;
        return player;
      });

      this.tournamentPlayersById = {};
      this.notesByTournamentPlayerId = {};
      this.notesPromises = [];
      _.each(this.tournamentPlayers, tournamentPlayer => {
        this.tournamentPlayersById[tournamentPlayer._id] = tournamentPlayer;
        const notesPromise = this.TournamentPlayerNoteService.getNotes({tournamentPlayerId: tournamentPlayer._id, leagueCode: this.leagueCode}).$promise;
        notesPromise.then(notes => {
          this.notesByTournamentPlayerId[tournamentPlayer._id] = _.orderBy(notes, ['createdAt'], ['desc']);
        });
        this.notesPromises.push(notesPromise);
      });

      this.$q.all(this.notesPromises).then(() => {
        this.playersInfoLoaded = true;
      });
    }, () => {
      this.$state.go('league.tournament');
    });
  }

  showPlayerInfo(tournamentPlayer) {
    const matchesForPlayer = _.filter(this.matches, match => {
      return _.find(match['match-results'], { tournamentPlayerId: tournamentPlayer._id });
    });
    const notes = this.notesByTournamentPlayerId[tournamentPlayer._id];
    const currentNote = _.isEmpty(notes) ? { tournamentPlayerId: tournamentPlayer._id } : angular.copy(_.first(notes));
    this.$uibModal.open({
      template: require('../../components/player-stats-modal/player-stats-modal.html'),
      controller: 'playerStatsModal',
      controllerAs: '$ctrl',
      windowClass: 'ssk-modal-right',
      backdropClass: 'ssk-model-backdrop',
      resolve: {
        tournamentPlayer: () => {
          return tournamentPlayer;
        },
        matches: () => {
          return matchesForPlayer;
        },
        notes: () => {
          return notes;
        },
        currentNote: () => {
          return currentNote;
        }
      }
    }).result.then(() => {
      this.saveNote(currentNote, notes);
    }, () => {
      this.saveNote(currentNote, notes);
    });
  }

  saveNote(note, notes) {
    if(!note._id || note.message != _.first(notes).message) {
      this.TournamentPlayerNoteService.create({ tournamentPlayerId: note.tournamentPlayerId, message: note.message, leagueCode: this.leagueCode});
      notes.unshift(note);
    }
  }

  getNote(notes) {
    return !_.isEmpty(notes) ? _.first(notes).message : null;
  }

  // Edit mode
  enableEditMode() {
    this.editMode = true;
  }

  recalcMatches() {
    this.recalcingMatches = true;
    const initScore = this.tournament.scoreType === 'ELO' ? 2000 : 0;
    _.each(this.tournamentPlayersById, tournamentPlayer => {
      tournamentPlayer.score = initScore;
    });

    const deferred = [];
    const orderedMatchesByDate = _.orderBy(this.matches, ['createdAt'], ['asc']);
    _.each(orderedMatchesByDate, match => {
      const winnerMatchResult = match['match-results'][0];
      const loserMatchResult = match['match-results'][1];

      const winner = this.tournamentPlayersById[winnerMatchResult.tournamentPlayerId];
      const loser = this.tournamentPlayersById[loserMatchResult.tournamentPlayerId];
      const winnerScoreDelta = this.TournamentViewService.calculateScoreForWinner(this.tournament, winner, loser);
      const loserScoreDelta = this.TournamentViewService.calculateScoreForLoser(this.tournament, winner, loser);

      winnerMatchResult.scoreDelta = winnerScoreDelta;
      winnerMatchResult.lastScore = winner.score;
      winner.score += winnerScoreDelta;

      loserMatchResult.scoreDelta = loserScoreDelta;
      loserMatchResult.lastScore = loser.score;
      loser.score += loserScoreDelta;

      deferred.push(this.MatchResultService.patch({id: winnerMatchResult._id, lastScore: winnerMatchResult.lastScore, scoreDelta: winnerMatchResult.scoreDelta, leagueCode: this.leagueCode}).$promise);
      deferred.push(this.MatchResultService.patch({id: loserMatchResult._id, lastScore: loserMatchResult.lastScore, scoreDelta: loserMatchResult.scoreDelta, leagueCode: this.leagueCode}).$promise);
    });

    const tournamentPlayers = _.orderBy(this.tournamentPlayers, ['score'], ['desc']);
    _.each(tournamentPlayers, (tournamentPlayer, index) => {
      tournamentPlayer.rank = index + 1;
      deferred.push(this.TournamentPlayerService.patch({id: tournamentPlayer._id, score: tournamentPlayer.score, leagueCode: this.leagueCode}).$promise);
    });

    this.$q.all(deferred).then(() => {
      this.recalcingMatches = false;
    });
  }

}

export default angular.module('tournamentTrackerApp.tournament-detail', [uiRouter])
  .config(routes)
  .component('tournamentDetail', {
    template: require('./tournament-detail.html'),
    controller: TournamentDetailComponent,
    controllerAs: '$ctrl'
  })
  .name;
