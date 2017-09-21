'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('league.dashboard', {
    url: '/dashboard',
    template: '<main style="height: 100%"></main>'
  });
}
