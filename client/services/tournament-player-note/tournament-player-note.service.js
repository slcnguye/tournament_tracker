'use strict';

export function TournamentPlayerNoteResource($resource) {
  'ngInject';

  return $resource('/api/tournament-player-notes/:id', {
    id: '@id'
  }, {
    create: {
      method: 'POST'
    },
    get: {
      method: 'GET'
    },
    getNotes: {
      method: 'GET',
      isArray: true
    }
  });
}
