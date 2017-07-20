'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('add-player', {
      url: '/add-player/{tournamentId:int}',
      template: '<add-player></add-player>'
    });
}
