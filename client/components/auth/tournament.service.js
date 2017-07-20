'use strict';

export function TournamentResource($resource) {
  'ngInject';

  return $resource('/api/tournaments/:id', {
    id: '@_id'
  }, {
    create: {
      method: 'POST'
    },
    get: {
      method: 'GET'
    }
  });
}
