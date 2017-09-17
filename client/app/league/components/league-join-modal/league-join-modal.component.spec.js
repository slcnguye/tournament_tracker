'use strict';

describe('Component: leagueJoinModal', function() {
  // load the component's module
  beforeEach(module('tournamentTrackerApp.league-join-modal'));

  let leagueJoinModalComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    leagueJoinModalComponent = $componentController('leagueJoinModal', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
