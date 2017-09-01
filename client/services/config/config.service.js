'use strict';

export function ConfigService($resource) {
  'ngInject';

  return $resource('/api/config', {}, {
    get: {
      method: 'GET'
    }
  });
}
