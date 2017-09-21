'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('league.tournament', {
      url: '/tournament',
      template: '<tournament></tournament>'
    });
}
