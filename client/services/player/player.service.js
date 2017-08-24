'use strict';

export function PlayerResource($resource) {
  'ngInject';

  return $resource('/api/players/:id', {
    id: '@id'
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
