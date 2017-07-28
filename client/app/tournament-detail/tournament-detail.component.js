'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './tournament-detail.routes';

export class TournamentDetailComponent {
  constructor($q, $stateParams, Tournament, TournamentPlayer, Player) {
    'ngInject';
    this.$q = $q;
    this.$stateParams = $stateParams;
    this.Tournament = Tournament;
    this.TournamentPlayer = TournamentPlayer;
    this.Player = Player;

    this.tournamentId = this.$stateParams.tournamentId;
  }

  $onInit() {
    this.$q.all([
      this.Tournament.get({id: this.tournamentId}).$promise,
      this.TournamentPlayer.query({tournamentId: this.tournamentId}).$promise,
      this.Player.query().$promise
    ]).then((response) => {
      this.tournament = response[0];
      const tournamentPlayers = response[1];
      this.players = response[2];

      this.playersById = {};
      _.each(this.players, (player) => {
        this.playersById[player._id] = player;
      });

      this.tournamentPlayers = _.map(tournamentPlayers, (tournamentPlayer) => {
        const player = angular.copy(tournamentPlayer);
        player.name = this.playersById[player.playerId].name;
        player.score = player.score || 0;
        return player;
      });
    });
  }

  addMatch() {
    this.addMatching = true;
  }

  saveMatch() {
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
    if (this.tournament.scoreType == "3PW") {
      return 3;
    } else if (this.tournament.scoreType == "ELO" && winner && winner.score && loser && loser.score) {
      const k = 16;
      const eloDifference = winner.score - loser.score;
      const percentage = 1 / ( 1 + Math.pow(10, eloDifference / 400) );

      const win = Math.round(k * ( 1 - percentage ));
      // const draw = Math.round(k * ( .5 - percentage ));
      // const lose = Math.round(k * ( 0 - percentage ));
      return win;
    }
   }

  calculateScoreForLoser(winner, loser) {
    if (this.tournament.scoreType == "3PW") {
      return 0;
    } else if (this.tournament.scoreType == "ELO" && winner && winner.score && loser && loser.score) {
      const k = 16;
      const eloDifference = winner.score - loser.score;
      const percentage = 1 / ( 1 + Math.pow(10, eloDifference / 400) );

      // const win = Math.round(k * ( 1 - percentage ));
      // const draw = Math.round(k * ( .5 - percentage ));
      const lose = Math.round(k * ( 0 - percentage ));
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
