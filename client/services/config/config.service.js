'use strict';

export function ConfigService($resource) {
  'ngInject';

  return $resource('/api/configs', {}, {
    get: {
      method: 'GET'
    }
  });
}
