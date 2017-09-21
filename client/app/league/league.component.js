'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import components from './components/components.module';
import routes from './league.routes';
import _ from 'lodash';

export class LeagueComponent {

  constructor($uibModal, $stateParams, $state, LeagueService) {
    'ngInject';

    this.$uibModal = $uibModal;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.LeagueService = LeagueService;
  }

  $onInit() {
    this.leaguesLoaded = false;
    this.noRedirect = this.$stateParams.noRedirect;

    this.LeagueService.query().$promise
      .then(leagues => {
        this.leagues = leagues;
        if(this.leagues.length === 1 && !this.noRedirect) {
          this.$state.go('league.dashboard', {leagueCode: _.first(this.leagues).code});
        }
        this.leaguesLoaded = true;
      });
  }

  joinLeague() {
    this.$uibModal.open({
      template: require('./components/league-join-modal/league-join-modal.html'),
      controller: 'leagueJoinModal',
      controllerAs: '$ctrl',
      windowClass: 'ssk-modal-right',
      backdropClass: 'ssk-model-backdrop',
    }).result.then(league => {
      this.leagues.push(league);
    }, () => {});
  }

  createLeague() {
    this.$uibModal.open({
      template: require('./components/league-create-modal/league-create-modal.html'),
      controller: 'leagueCreateModal',
      controllerAs: '$ctrl',
      windowClass: 'ssk-modal-right',
      backdropClass: 'ssk-model-backdrop',
    }).result.then(league => {
      this.leagues.push(league);
    }, () => {});
  }
}

export default angular.module('tournamentTrackerApp.league', [uiRouter, components])
  .config(routes)
  .component('league', {
    template: require('./league.html'),
    controller: LeagueComponent,
    controllerAs: '$ctrl'
  })
  .name;
