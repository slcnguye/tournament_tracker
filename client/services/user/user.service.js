'use strict';

export function UserService($resource) {
  'ngInject';

  return $resource('/api/users/me', {}, {
    me: {
      method: 'GET'
    }
  });
}
