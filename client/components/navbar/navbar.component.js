'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {

  constructor($state) {
    'ngInject';

    this.$state = $state;
  }

  isDashboard() {
    return this.$state.current.name === 'main';
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
