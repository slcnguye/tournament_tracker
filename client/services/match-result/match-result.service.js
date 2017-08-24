'use strict';

export function MatchResultResource($resource) {
  'ngInject';

  return $resource('/api/match-results/:id', {
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
    },
    patch: {
      method: 'PATCH'
    }
  });
}
