'use strict';

describe('Component: playerStatsModal', function() {
  // load the component's module
  beforeEach(module('tournamentTrackerApp.player-stats-modal'));

  var playerStatsModalComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    playerStatsModalComponent = $componentController('playerStatsModal', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
