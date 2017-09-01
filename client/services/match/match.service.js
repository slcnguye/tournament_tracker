'use strict';

export function MatchService($resource) {
  'ngInject';

  return $resource('/api/matches/:id', {
    id: '@id'
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
