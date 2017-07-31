'use strict';

import $ from 'jquery';
require('angular-mocks');
describe('Directive: ngEnter', function() {
  // load the directive's module
  beforeEach(angular.mock.module('tournamentTrackerApp.ng-enter'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<ng-enter></ng-enter>');
    element = $compile(element)(scope);
    expect(element).toBeDefined();
    // expect(element.text()).toBe('this is the ngEnter directive');
  }));

  it('it should call the mock function on pressing enter', function() {
    scope.mockFunction = function() {};
    compileDirective();

    spyOn(scope, 'mockFunction');
    let e = $.Event('keypress');
    e.which = 13; //choose the one you want
    e.keyCode = 13;
    element.trigger(e);
    expect(scope.mockFunction).toHaveBeenCalled();
  });

  /**
   * Compile the directive into HTML
   */
  function compileDirective() {
    element = angular.element('<input type="text" ng-enter="mockFunction()" />');
    inject(function($compile) {
      element = $compile(element)(scope);
    });
    scope.$apply();
  }
});
