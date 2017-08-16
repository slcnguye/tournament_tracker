'use strict';

describe('Component: playerScoreChart', function() {
  // load the component's module
  beforeEach(module('tournamentTrackerApp.player-score-chart'));

  var playerScoreChartComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    playerScoreChartComponent = $componentController('playerScoreChart', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
