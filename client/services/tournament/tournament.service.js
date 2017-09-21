'use strict';

export function TournamentService($resource) {
  'ngInject';

  return $resource('/api/leagues/:leagueCode/tournaments/:id', {
    id: '@id',
    leagueCode: '@leagueCode'
  }, {
    create: {
      method: 'POST'
    },
    get: {
      method: 'GET'
    },
    getPlayers: {
      method: 'GET',
      isArray: true
    }
  });
}
