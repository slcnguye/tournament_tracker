'use strict';

describe('Component: changeLogModal', function() {
  // load the component's module
  beforeEach(module('tournamentTrackerApp.change-log-modal'));

  var changeLogModalComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    changeLogModalComponent = $componentController('changeLogModal', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
