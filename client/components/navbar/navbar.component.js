'use strict';

import angular from 'angular';

export class NavbarComponent {

  constructor($rootScope, $state, store, FacebookAuthService) {
    'ngInject';

    this.$rootScope = $rootScope;
    this.$state = $state;
    this.store = store;
    this.FacebookAuthService = FacebookAuthService;
  }

  $onInit() {
    this.$rootScope.$on('$stateChangeStart', () => {
      this.user = this.store.get('user');
    });
  }

  isDashboard() {
    return this.$state.current.name === 'main';
  }

  logout() {
    this.user = null;
    this.store.remove('user');
    this.FacebookAuthService.logout();
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
