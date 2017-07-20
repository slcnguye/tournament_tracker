'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var matchCtrlStub = {
  index: 'matchCtrl.index',
  show: 'matchCtrl.show',
  create: 'matchCtrl.create',
  upsert: 'matchCtrl.upsert',
  patch: 'matchCtrl.patch',
  destroy: 'matchCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var matchIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './match.controller': matchCtrlStub
});

describe('Match API Router:', function() {
  it('should return an express router instance', function() {
    matchIndex.should.equal(routerStub);
  });

  describe('GET /api/matchs', function() {
    it('should route to match.controller.index', function() {
      routerStub.get
        .withArgs('/', 'matchCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/matchs/:id', function() {
    it('should route to match.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'matchCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/matchs', function() {
    it('should route to match.controller.create', function() {
      routerStub.post
        .withArgs('/', 'matchCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/matchs/:id', function() {
    it('should route to match.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'matchCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/matchs/:id', function() {
    it('should route to match.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'matchCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/matchs/:id', function() {
    it('should route to match.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'matchCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
