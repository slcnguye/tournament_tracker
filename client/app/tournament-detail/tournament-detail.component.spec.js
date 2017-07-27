'use strict';

describe('Component: TournamentDetailComponent', function() {
  // load the controller's module
  beforeEach(module('tournamentTrackerApp.tournament-detail'));

  var TournamentDetailComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    TournamentDetailComponent = $componentController('tournament-detail', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
