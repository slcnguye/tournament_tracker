'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './profile.routes';

export class ProfileComponent {
  constructor($state, store, UserService) {
    'ngInject';

    angular.extend(this, {
      $state,
      store,
      UserService,

      form: null,
      user: null,
      preferredName: null
    });
  }

  $onInit() {
    this.user = this.store.get('user');
    this.preferredName = this.user.preferredName || this.user.name;
  }

  saveProfile(preferredName) {
    this.UserService.patch({
      preferredName
    }).$promise.then(user => {
      this.store.set('user', user);
      this.$state.reload();
    });
  }
}

export default angular.module('tournamentTrackerApp.profile', [uiRouter])
  .config(routes)
  .component('profile', {
    template: require('./profile.html'),
    controller: ProfileComponent,
    controllerAs: '$ctrl'
  })
  .name;
