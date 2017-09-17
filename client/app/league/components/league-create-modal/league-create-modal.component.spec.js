'use strict';

describe('Component: leagueCreateModal', function() {
  // load the component's module
  beforeEach(module('tournamentTrackerApp.league-create-modal'));

  let leagueCreateModalComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    leagueCreateModalComponent = $componentController('leagueCreateModal', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
