'use strict';

export function authInterceptor($q, $injector) {
  'ngInject';

  let state;
  return {
    // Intercept 401s and redirect you to login
    responseError(response) {
      if(response.status === 401) {
        (state || (state = $injector.get('$state')))
          .go('login');
        // TODO: remove token?
      }
      return $q.reject(response);
    }
  };
}
