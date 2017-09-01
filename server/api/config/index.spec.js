'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var configCtrlStub = {
  index: 'configCtrl.index',
};

var routerStub = {
  get: sinon.spy(),
};

// require the index with our stubbed out modules
var configIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './config.controller': configCtrlStub
});

describe('Config API Router:', function() {
  it('should return an express router instance', function() {
    configIndex.should.equal(routerStub);
  });

  describe('GET /api/configs', function() {
    it('should route to config.controller.index', function() {
      routerStub.get
        .withArgs('/', 'configCtrl.index')
        .should.have.been.calledOnce;
    });
  });

});
