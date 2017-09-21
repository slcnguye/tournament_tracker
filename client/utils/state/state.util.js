'use strict';

export function StateUtil($state) {
  'ngInject';

  return {
    getLeagueCodeFromUrl: function() {
      return $state.params.leagueCode;
    }
  };
}
