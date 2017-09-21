'use strict';
const angular = require('angular');

export class leagueCreateModalController {
  constructor($uibModalInstance, store, LeagueService, PlayerService) {
    'ngInject';

    this.$uibModalInstance = $uibModalInstance;
    this.store = store;
    this.LeagueService = LeagueService;
    this.PlayerService = PlayerService;
  }

  $onInit() {
    this.user = this.store.get('user');
  }

  save(leagueName) {
    this.LeagueService.create({
      name: leagueName
    }).$promise.then(league => {
      return this.PlayerService.create({
        name: this.user.firstName,
        userId: this.user._id,
        leagueId: league._id,
        leagueCode: league.code,
      }).$promise.then(player => {
        league.players = [player];
        this.$uibModalInstance.close(league);
      });
    });
  }

  close() {
    this.$uibModalInstance.dismiss();
  }
}

export default angular.module('tournamentTrackerApp.league-create-modal', [])
  .controller('leagueCreateModal', leagueCreateModalController)
  .name;
