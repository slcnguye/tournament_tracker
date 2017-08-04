'use strict';
const angular = require('angular');

export class playerStatsModalComponent {
  constructor() {
    'ngInject';

    this.message = 'World';
    console.log(this);
  }
}

export default angular.module('tournamentTrackerApp.player-stats-modal', [])
  .component('playerStatsModal', {
    template: require('./player-stats-modal.html'),
    bindings: {
      tournamentPlayer: '<'
     },
    controller: playerStatsModalComponent
  })
  .name;
