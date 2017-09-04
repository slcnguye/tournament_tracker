'use strict';

export function authInterceptor($q, $injector) {
  'ngInject';

  let state;
  let store;
  return {
    // Intercept 401s and redirect you to login
    responseError(response) {
      if(response.status === 401) {
        (store || (store = $injector.get('store')))
          .remove('user');
        (state || (state = $injector.get('$state')))
          .go('login');
      }
      return $q.reject(response);
    }
  };
}
