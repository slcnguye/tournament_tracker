'use strict';

export function TournamentPlayerService($resource) {
  'ngInject';

  return $resource('/api/leagues/:leagueCode/tournament-players/:id', {
    id: '@id',
    leagueCode: '@leagueCode'
  }, {
    create: {
      method: 'POST'
    },
    get: {
      method: 'GET'
    },
    delete: {
      method: 'DELETE'
    },
    patch: {
      method: 'PATCH'
    }
  });
}
