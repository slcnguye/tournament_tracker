'use strict';

describe('Component: matchTable', function() {
  // load the component's module
  beforeEach(module('tournamentTrackerApp.match-table'));

  var matchTableComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    matchTableComponent = $componentController('matchTable', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
