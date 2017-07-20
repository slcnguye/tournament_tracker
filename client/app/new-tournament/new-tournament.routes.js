'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('new-tournament', {
      url: '/new-tournament',
      template: '<new-tournament></new-tournament>'
    });
}
