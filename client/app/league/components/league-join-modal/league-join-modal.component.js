'use strict';
const angular = require('angular');

import _ from 'lodash';

export class leagueJoinModalController {
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

  checkLeagueCode(leagueCode) {
    this.message = null;

    if(leagueCode.length === 10) {
      this.checkingCode = true;
      this.LeagueService.get({ code: leagueCode }).$promise
        .then(league => {
          const userInLeague = _.find(league.players, {userId: this.user._id});
          if(userInLeague) {
            this.close();
          } else {
            this.PlayerService.create({
              name: this.user.firstName,
              userId: this.user._id,
              leagueId: league._id,
              leagueCode: league.code
            }).$promise.then(player => {
              league.players.push(player);
              this.$uibModalInstance.close(league);
            });
          }
          this.checkingCode = false;
        }, error => {
          this.message = 'League code is invalid.';
          this.checkingCode = false;
        });
    }
  }

  close() {
    this.$uibModalInstance.dismiss();
  }
}

export default angular.module('tournamentTrackerApp.league-join-modal', [])
  .controller('leagueJoinModal', leagueJoinModalController)
  .name;
