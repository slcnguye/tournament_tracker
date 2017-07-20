'use strict';

describe('Component: NewTournamentComponent', function() {
  // load the controller's module
  beforeEach(module('tournamentTrackerApp.new-tournament'));

  var NewTournamentComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    NewTournamentComponent = $componentController('new-tournament', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
