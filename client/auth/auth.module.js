'use strict';

import angular from 'angular';

import { FacebookAuthService } from '../auth/facebook-auth/facebook-auth.service';

const module = angular.module('tournamentTrackerApp.auth', []);

module.service('FacebookAuthService', FacebookAuthService);
module.run(
  function($window, $rootScope, $state, store, FacebookAuthService) {
    'ngInject';

    $rootScope.$on("$stateChangeStart", (event, next) => {
      if (next.name === 'login') {
        return;
      }

      let user = store.get('user');
      if (!user) {
        event.preventDefault();
        $state.go('login');
      }
    });

    $window.fbAsyncInit = function() {
      // Executed when the SDK is loaded
      FB.init({
        appId: '264875180684568',
        xfbml: false,
        status: true,
        version: 'v2.10'
      });
      FB.AppEvents.logPageView();

      const onAuthResponseChange = function(response) {
        if (!response.authResponse && !$state.is('login')) {
          $state.go('login');
        }

        if (response.authResponse) {
          let user = store.get('user');
          if (!user) {
            FacebookAuthService.getUserInfo()
              .then(response => {
                if (!response.error) {
                  user = response;
                  store.set('user', user);
                  if ($state.is('login')) {
                    $state.go('main');
                  }
                }
              });
          }
        }
      };

      FB.Event.subscribe('auth.authResponseChange', onAuthResponseChange);
    };

    (function(d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if(d.getElementById(id)) {
        return;
      }
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
);

export default module.name;
