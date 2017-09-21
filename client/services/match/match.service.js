'use strict';

export function MatchService($resource) {
  'ngInject';

  return $resource('/api/leagues/:leagueCode/matches/:id', {
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
    }
  });
}
