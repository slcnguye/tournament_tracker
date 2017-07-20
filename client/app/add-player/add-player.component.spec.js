'use strict';

describe('Component: AddPlayerComponent', function() {
  // load the controller's module
  beforeEach(module('tournamentTrackerApp.add-player'));

  var AddPlayerComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AddPlayerComponent = $componentController('add-player', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
