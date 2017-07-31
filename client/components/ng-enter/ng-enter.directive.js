'use strict';
const angular = require('angular');

function ngLink(scope, elements, attrs) {
  elements.bind('keydown keypress', function(event) {
    if(event.which === 13) {
      scope.$apply(function() {
        scope.$eval(attrs.ngEnter);
      });
      event.preventDefault();
    }
  });
}

export default angular.module('tournamentTrackerApp.ng-enter', [])
  .directive('ngEnter', function() {
    return {
      restrict: 'A',
      link: ngLink
    };
  })
  .name;
