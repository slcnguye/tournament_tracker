'use strict';

export function TournamentPlayerResource($resource) {
  'ngInject';

  return $resource('/api/tournament-players/:id', {
    id: '@_id'
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
