'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './new-tournament.routes';

export class NewTournamentComponent {
  constructor($state, TournamentService) {
    'ngInject';
    this.$state = $state;
    this.TournamentService = TournamentService;

    this.tournament = {
      scoreType: '3PW'
    };
  }

  createTournament() {
    this.TournamentService.create(this.tournament).$promise
      .then(tournament => {
        this.$state.go('add-player', { tournamentId: tournament._id });
      })
      .catch(err => {
        this.errors = err.data.message;
      });
  }
}

export default angular.module('tournamentTrackerApp.new-tournament', [uiRouter])
  .config(routes)
  .component('newTournament', {
    template: require('./new-tournament.html'),
    controller: NewTournamentComponent,
    controllerAs: '$ctrl'
  })
  .name;
