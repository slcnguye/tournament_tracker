'use strict';

export function TournamentService($resource) {
  'ngInject';

  return $resource('/api/tournaments/:id', {
    id: '@id'
  }, {
    create: {
      method: 'POST'
    },
    get: {
      method: 'GET'
    },
    getPlayers: {
      method: 'GET',
      isArray: true
    }
  });
}
