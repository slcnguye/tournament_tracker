'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './login.routes';

export class LoginComponent {
  constructor(FacebookAuthService) {
    'ngInject';

    this.FacebookAuthService = FacebookAuthService;
  }

  $onInit() {
    this.FacebookAuthService.initAuth();
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
