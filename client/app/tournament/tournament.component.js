'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './tournament.routes';

export class TournamentComponent {
  constructor(TournamentService) {
    'ngInject';
    this.TournamentService = TournamentService;
  }

  $onInit() {
    this.TournamentService.query().$promise
      .then(tournaments => {
        this.tournaments = tournaments;
      });
  }
}

export default angular.module('tournamentTrackerApp.tournament', [uiRouter])
  .config(routes)
  .component('tournament', {
    template: require('./tournament.html'),
    controller: TournamentComponent,
    controllerAs: '$ctrl'
  })
  .name;
