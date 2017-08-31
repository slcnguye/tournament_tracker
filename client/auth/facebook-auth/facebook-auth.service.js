'use strict';

export function FacebookAuthService($q, $interval) {
  'ngInject';

  return {
    getLoginStatus: function() {
      let deferred = $q.defer();
      const interval = $interval(() => {
        try {
          FB.getLoginStatus(response => {
            deferred.resolve(response);
          });
          $interval.cancel(interval);
        } catch(err) {
          console.log('Waiting for FB api timeout: ' + err);
        }
      }, 200, 10);

      return deferred.promise;
    },
    logout: function() {
      let deferred = $q.defer();
      const interval = $interval(() => {
        try {
          FB.logout(response => {
            deferred.resolve(response);
          });
          $interval.cancel(interval);
        } catch(err) {
          console.log('Waiting for FB api timeout: ' + err);
        }
      }, 200, 10);

      return deferred.promise;
    },
    getUserInfo: function() {
      let deferred = $q.defer();
      const interval = $interval(() => {
        try {
          FB.api('/me?fields=id,name,picture,first_name', response => {
            deferred.resolve(response);
          });
          $interval.cancel(interval);
        } catch(err) {
          console.log('Waiting for FB api timeout: ' + err);
        }
      }, 200, 10);

      return deferred.promise;
    },
    initAuth: function() {
      let deferred = $q.defer();
      const interval = $interval(() => {
        try {
          FB.XFBML.parse();
          $interval.cancel(interval);
        } catch(err) {
          console.log('Waiting for FB api timeout: ' + err);
        }
      }, 200, 10);

      return deferred.promise;
    }
  };
}
