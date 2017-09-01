'use strict';

export default function($stateProvider) {
  'ngInject';

  $stateProvider
    .state('login', {
      url: '/login',
      template: '<login></login>'
    });
}
