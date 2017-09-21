'use strict';

export function LeagueService($resource) {
  'ngInject';

  return $resource('/api/leagues/:code', {
    code: '@code'
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
