'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('league', {
      url: '/league',
      template: '<league></league>'
    });
}
