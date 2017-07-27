'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('tournament-detail', {
      url: '/tournament/{tournamentId:int}',
      template: '<tournament-detail></tournament-detail>'
    });
}
