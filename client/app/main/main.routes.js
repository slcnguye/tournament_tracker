'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/dashboard',
    template: '<main style="height: 100%"></main>'
  });
}
