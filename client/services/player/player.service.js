'use strict';

export function PlayerService($resource) {
  'ngInject';

  return $resource('/api/leagues/:leagueCode/players/:id', {
    id: '@id',
    leagueCode: '@leagueCode',
  }, {
    create: {
      method: 'POST'
    },
    get: {
      method: 'GET'
    },
    query: {
      method: 'GET',
      isArray: true
    }
  });
}
