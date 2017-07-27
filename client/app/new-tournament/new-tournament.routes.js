'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('new-tournament', {
      url: '/tournament/new',
      template: '<new-tournament></new-tournament>'
    });
}
