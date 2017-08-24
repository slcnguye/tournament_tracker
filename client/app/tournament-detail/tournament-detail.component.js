'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './tournament-detail.routes';
import _ from 'lodash';

export class TournamentDetailComponent {
  constructor($uibModal, $q, $state, $stateParams, TournamentService, TournamentPlayerNoteService, TournamentPlayerService,
              PlayerService, MatchService, MatchResultService) {
    'ngInject';
    this.$q = $q;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$uibModal = $uibModal;
    this.TournamentService = TournamentService;
    this.TournamentPlayerNoteService = TournamentPlayerNoteService;
    this.TournamentPlayerService = TournamentPlayerService;
    this.PlayerService = PlayerService;
    this.MatchService = MatchService;
    this.MatchResult = MatchResultService;

    this.tournamentId = this.$stateParams.tournamentId;
  }

  $onInit() {
    this.$q.all([
      this.TournamentService.get({id: this.tournamentId}).$promise,
      this.TournamentPlayerService.query({tournamentId: this.tournamentId}).$promise,
      this.PlayerService.query().$promise,
      this.MatchService.query({tournamentId: this.tournamentId}).$promise
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
        const notesPromise = this.TournamentPlayerNoteService.getNotes({tournamentPlayerId: tournamentPlayer._id}).$promise;
        notesPromise.then(notes => {
          this.notesByTournamentPlayerId[tournamentPlayer._id] = _.orderBy(notes, ['createdAt'], ['desc']);
        });
        this.notesPromises.push(notesPromise);
      });

      this.$q.all(this.notesPromises).then(() => {
        this.playersInfoLoaded = true;
      });

      this.preparePagedMatches();
    }, () => {
      this.$state.go('tournament');
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
      this.TournamentPlayerNoteService.create({ tournamentPlayerId: note.tournamentPlayerId, message: note.message});
      notes.unshift(note);
    }
  }

  addMatch() {
    this.addMatching = true;
  }

  saveMatch(winner, loser) {
    const winnerScoreDelta = this.calculateScoreForWinner(winner, loser);
    const loserScoreDelta = this.calculateScoreForLoser(winner, loser);
    const match = {
      tournamentId: this.tournament._id
    };

    this.MatchService.create(match).$promise
      .then(savedMatch => {
        const updatedWinner = this.tournamentPlayersById[winner._id];
        updatedWinner.score += winnerScoreDelta;
        const updatedLoser = this.tournamentPlayersById[loser._id];
        updatedLoser.score += loserScoreDelta;

        const matchResult1 = {
          tournamentPlayerId: winner._id,
          matchId: savedMatch._id,
          scoreDelta: winnerScoreDelta,
          lastScore: updatedWinner.score,
        };

        const matchResult2 = {
          tournamentPlayerId: loser._id,
          matchId: savedMatch._id,
          scoreDelta: loserScoreDelta,
          lastScore: updatedLoser.score,
        };

        this.$q.all([
          this.MatchResult.create(matchResult1).$promise,
          this.MatchResult.create(matchResult2).$promise,
          this.TournamentPlayerService.patch({id: updatedWinner._id, score: updatedWinner.score}).$promise,
          this.TournamentPlayerService.patch({id: updatedLoser._id, score: updatedLoser.score}).$promise
        ]).then(matchResults => {
          savedMatch['match-results'] = [];
          savedMatch['match-results'].push(matchResults[0]);
          savedMatch['match-results'].push(matchResults[1]);
          this.matches.unshift(savedMatch);
          this.preparePagedMatches();
        });
      });

    this.resetMatchInputs();
  }

  cancelMatch() {
    this.resetMatchInputs();
  }

  resetMatchInputs() {
    this.addMatching = false;
    this.matchPlayer1 = null;
    this.matchPlayer2 = null;
  }

  // Inline calculations for score
  calculateScoreForWinner(winner, loser) {
    if(this.tournament.scoreType == '3PW') {
      return 3;
    } else if(this.tournament.scoreType == 'ELO' && winner && winner.score && loser && loser.score) {
      const k = 32;
      const eloDifference = loser.score - winner.score;
      const percentage = 1 / (1 + Math.pow(10, eloDifference / 400));

      const win = Math.round(k * (1 - percentage));
      // const draw = Math.round(k * (.5 - percentage));
      // const lose = Math.round(k * (0 - percentage));
      return win;
    }
  }

  calculateScoreForLoser(winner, loser) {
    if(this.tournament.scoreType == '3PW') {
      return 0;
    } else if(this.tournament.scoreType == 'ELO' && winner && winner.score && loser && loser.score) {
      const k = 32;
      const eloDifference = winner.score - loser.score;
      const percentage = 1 / (1 + Math.pow(10, eloDifference / 400));

      // const win = Math.round(k * (1 - percentage));
      // const draw = Math.round(k * (.5 - percentage));
      const lose = Math.round(k * (0 - percentage));
      return lose;
    }
  }

  // Paging
  preparePagedMatches() {
    this.matches = _.orderBy(this.matches, ['createdAt'], ['desc']);
    this.paging = this.paging || {};
    this.paging.totalPages = Math.ceil(_.size(this.matches) / 10);
    this.paging.pages = _.range(this.paging.totalPages);
    this.getPagedMatches(this.matches, this.paging, 0);
  }

  getPagedMatches(matches, paging, page) {
    paging.currentPage = page;
    this.pagedMatches = _.slice(matches, page * 10, page * 10 + 10);
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
      const winnerScoreDelta = this.calculateScoreForWinner(winner, loser);
      const loserScoreDelta = this.calculateScoreForLoser(winner, loser);

      winnerMatchResult.scoreDelta = winnerScoreDelta;
      winnerMatchResult.lastScore = winner.score;
      winner.score += winnerScoreDelta;

      loserMatchResult.scoreDelta = loserScoreDelta;
      loserMatchResult.lastScore = loser.score;
      loser.score += loserScoreDelta;

      deferred.push(this.MatchResult.patch({id: winnerMatchResult._id, lastScore: winnerMatchResult.lastScore, scoreDelta: winnerMatchResult.scoreDelta}).$promise);
      deferred.push(this.MatchResult.patch({id: loserMatchResult._id, lastScore: loserMatchResult.lastScore, scoreDelta: loserMatchResult.scoreDelta}).$promise);
    });

    const tournamentPlayers = _.orderBy(this.tournamentPlayers, ['score'], ['desc']);
    _.each(tournamentPlayers, (tournamentPlayer, index) => {
      tournamentPlayer.rank = index + 1;
      deferred.push(this.TournamentPlayerService.patch({id: tournamentPlayer._id, score: tournamentPlayer.score}).$promise);
    });

    this.$q.all(deferred).then(() => {
      this.recalcingMatches = false;
    });
  }

  getNote(notes) {
    return !_.isEmpty(notes) ? _.first(notes).message : null;
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
