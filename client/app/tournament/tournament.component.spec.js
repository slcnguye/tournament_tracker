'use strict';

describe('Component: TournamentComponent', function() {
  // load the controller's module
  beforeEach(module('tournamentTrackerApp.tournament'));

  var TournamentComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    TournamentComponent = $componentController('tournament', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
