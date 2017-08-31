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
    this.FacebookAuthService.getLoginStatus()
      .then(response => {
        console.log(response);
        this.FacebookAuthService.getUserInfo()
          .then(b => {
            this.userInfo = b;
            console.log(this.userInfo);
          });
      });
  }

  logout() {
    this.FacebookAuthService.logout();
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
