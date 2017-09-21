'use strict';

describe('Component: LeagueComponent', function() {
  // load the controller's module
  beforeEach(module('tournamentTrackerApp.league'));

  var LeagueComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    LeagueComponent = $componentController('league', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
