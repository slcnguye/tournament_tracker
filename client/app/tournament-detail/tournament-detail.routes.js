'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('league.tournament-detail', {
      url: '/tournament/{tournamentId:int}',
      template: '<tournament-detail></tournament-detail>'
    });
}
