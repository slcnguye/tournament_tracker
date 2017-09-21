'use strict';

export function TournamentPlayerNoteService($resource) {
  'ngInject';

  return $resource('/api/leagues/:leagueCode/tournament-player-notes/:id', {
    id: '@id',
    leagueCode: '@leagueCode'
  }, {
    create: {
      method: 'POST'
    },
    get: {
      method: 'GET'
    },
    getNotes: {
      method: 'GET',
      isArray: true
    }
  });
}
