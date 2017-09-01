'use strict';

export function TournamentPlayerService($resource) {
  'ngInject';

  return $resource('/api/tournament-players/:id', {
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
