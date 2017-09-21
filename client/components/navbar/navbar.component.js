'use strict';

import angular from 'angular';

export class NavbarComponent {

  constructor($rootScope, $state, store, $auth) {
    'ngInject';

    this.$rootScope = $rootScope;
    this.$state = $state;
    this.store = store;
    this.$auth = $auth;
  }

  $onInit() {
    this.$rootScope.$on('$stateChangeStart', (event, toState) => {
      this.user = this.store.get('user');
      if(toState.name !== 'login' && !this.user) {
        event.preventDefault();
        this.logout();
      }
    });
  }

  logout() {
    this.$auth.logout().then(() => {
      this.store.remove('user');
      this.$state.go('login');
    });
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
