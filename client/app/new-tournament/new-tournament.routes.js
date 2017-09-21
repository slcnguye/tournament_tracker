'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('league.new-tournament', {
      url: '/tournament/new',
      template: '<new-tournament></new-tournament>'
    });
}
