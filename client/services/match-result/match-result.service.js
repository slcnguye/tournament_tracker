'use strict';

export function MatchResultService($resource) {
  'ngInject';

  return $resource('/api/leagues/:leagueCode/match-results/:id', {
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
