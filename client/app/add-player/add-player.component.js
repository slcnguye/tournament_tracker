'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './add-player.routes';

export class AddPlayerComponent {
  constructor($state, $stateParams, Tournament) {
    'ngInject';
    this.Tournament = Tournament;
    this.$stateParams = $stateParams;

    this.loadTournament(this.$stateParams.tournamentId)
      .then((tournament) => {
        this.tournament = tournament;
      });
  }

  loadTournament(id) {
    return this.Tournament.get({id}).$promise;
  }
}

export default angular.module('tournamentTrackerApp.add-player', [uiRouter])
  .config(routes)
  .component('addPlayer', {
    template: require('./add-player.html'),
    controller: AddPlayerComponent,
    controllerAs: '$ctrl'
  })
  .name;
