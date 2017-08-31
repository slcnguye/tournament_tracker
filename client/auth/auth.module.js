'use strict';

import angular from 'angular';

import { FacebookAuthService } from '../auth/facebook-auth/facebook-auth.service';

const module = angular.module('tournamentTrackerApp.auth', []);

module.service('FacebookAuthService', FacebookAuthService);
module.run(
  function($window) {
    'ngInject';

    $window.fbAsyncInit = function() {
      // Executed when the SDK is loaded
      FB.init({
        appId: '264875180684568',
        xfbml: true,
        version: 'v2.10'
      });
      FB.AppEvents.logPageView();
      console.log('loaded');
    };

      // sAuth.watchAuthenticationStatusChange();
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
