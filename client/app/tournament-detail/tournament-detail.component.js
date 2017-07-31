'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './tournament-detail.routes';
import _ from 'lodash';

export class TournamentDetailComponent {
  constructor($q, $stateParams, Tournament, TournamentPlayer, Player, Match, MatchResult) {
    'ngInject';
    this.$q = $q;
    this.$stateParams = $stateParams;
    this.Tournament = Tournament;
    this.TournamentPlayer = TournamentPlayer;
    this.Player = Player;
    this.Match = Match;
    this.MatchResult = MatchResult;

    this.tournamentId = this.$stateParams.tournamentId;
  }

  $onInit() {
    this.$q.all([
      this.Tournament.get({id: this.tournamentId}).$promise,
      this.TournamentPlayer.query({tournamentId: this.tournamentId}).$promise,
      this.Player.query().$promise,
      this.Match.query({tournamentId: this.tournamentId}).$promise
    ]).then(response => {
      this.tournament = response[0];
      const tournamentPlayers = response[1];
      this.players = response[2];
      this.matches = response[3];

      this.playersById = {};
      _.each(this.players, player => {
        this.playersById[player._id] = player;
      });

      this.tournamentPlayers = _.map(tournamentPlayers, tournamentPlayer => {
        const player = angular.copy(tournamentPlayer);
        player.name = this.playersById[player.playerId].name;
        player.score = player.score || 0;
        return player;
      });

      this.tournamentPlayersById = {};
      _.each(this.tournamentPlayers, tournamentPlayer => {
        this.tournamentPlayersById[tournamentPlayer._id] = tournamentPlayer;
      });

      this.matchDetails = [];
      _.each(this.matches, match => {
        this.MatchResult.query({matchId: match._id}).$promise
          .then(matchResults => {
            const matchDetail = angular.copy(match);
            const result1IsWinner = matchResults[0].scoreDelta > matchResults[1].scoreDelta;
            matchDetail.player1 = result1IsWinner ? matchResults[0] : matchResults[1];
            matchDetail.player2 = result1IsWinner ? matchResults[1] : matchResults[0];
            this.matchDetails.push(matchDetail);
          });
      });
    });
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

    this.Match.create(match).$promise
      .then(savedMatch => {
        const matchResult1 = {
          tournamentPlayerId: winner._id,
          matchId: savedMatch._id,
          scoreDelta: winnerScoreDelta
        };
        const matchResult2 = {
          tournamentPlayerId: loser._id,
          matchId: savedMatch._id,
          scoreDelta: loserScoreDelta
        };

        const updatedWinner = this.tournamentPlayersById[winner._id];
        updatedWinner.score += winnerScoreDelta;
        const updatedLoser = this.tournamentPlayersById[loser._id];
        updatedLoser.score += loserScoreDelta;

        this.$q.all([
          this.MatchResult.create(matchResult1).$promise,
          this.MatchResult.create(matchResult2).$promise,
          this.TournamentPlayer.patch({id: updatedWinner._id, score: updatedWinner.score}).$promise,
          this.TournamentPlayer.patch({id: updatedLoser._id, score: updatedLoser.score}).$promise
        ]).then(matchResults => {
          const matchDetail = angular.copy(savedMatch);
          matchDetail.player1 = matchResults[0];
          matchDetail.player2 = matchResults[1];
          this.matchDetails.push(matchDetail);
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
//  how do you create matches with match results
}

export default angular.module('tournamentTrackerApp.tournament-detail', [uiRouter])
  .config(routes)
  .component('tournamentDetail', {
    template: require('./tournament-detail.html'),
    controller: TournamentDetailComponent,
    controllerAs: '$ctrl'
  })
  .name;
