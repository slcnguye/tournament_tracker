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
      this.tournamentPlayers = response[1];
      this.players = response[2];

      this.playersById = {};
      _.each(this.players, (player) => {
        this.playersById[player._id] = player;
      });
    });
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
