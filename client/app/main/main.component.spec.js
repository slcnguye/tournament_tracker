'use strict';

import main from './main.component';
import {
  MainController
} from './main.component';

describe('Component: MainComponent', function() {
  beforeEach(angular.mock.module(main));
  beforeEach(angular.mock.module('stateMock'));

  var scope;
  var mainComponent;
  var state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, $state) {
    scope = $rootScope.$new();
    state = $state;
    mainComponent = $componentController('main', {
      $http,
      $scope: scope
    });
  }));

  it('should attach a list of things to the controller', function() {
    mainComponent.$onInit();
  });
});
