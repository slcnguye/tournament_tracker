'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './login.routes';

export class LoginComponent {
  constructor($auth, $state, SatellizerConfig, ConfigService, UserService, store) {
    'ngInject';

    this.$auth = $auth;
    this.$state = $state;
    this.SatellizerConfig = SatellizerConfig;
    this.ConfigService = ConfigService;
    this.UserService = UserService;
    this.store = store;
  }

  $onInit() {
    if(this.$auth.isAuthenticated()) {
      this.$state.go('main');
    } else {
      this.loggingIn = false;
    }

    this.ConfigService.get().$promise
      .then(config => {
        this.SatellizerConfig.providers['google'].clientId = config.auth.google.clientId;
        this.SatellizerConfig.providers['facebook'].clientId = config.auth.facebook.clientId;
      });
  }

  authenticate(provider) {
    this.loggingIn = true;
    this.$auth.authenticate(provider).then(() => {
      this.UserService.me().$promise
        .then(user => {
          this.store.set('user', user);
          this.loggingIn = false;
          this.$state.go('main');
      });
    });
  }
}

export default angular.module('tournamentTrackerApp.login', [uiRouter])
  .config(routes)
  .component('login', {
    template: require('./login.html'),
    controller: LoginComponent,
    controllerAs: '$ctrl'
  })
  .name;
