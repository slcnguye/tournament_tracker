'use strict';

export function MatchResource($resource) {
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
