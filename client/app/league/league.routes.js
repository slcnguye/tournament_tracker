'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('league', {
      abstract: true,
      url: '/league/:leagueCode',
      template: '<div ui-view="" style="height: 100%;"></div>'
    })
    .state('league-list', {
      url: '/league?noRedirect',
      template: '<league></league>'
    });
}
