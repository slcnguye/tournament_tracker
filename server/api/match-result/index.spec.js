'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var matchResultStub = {
  index: 'matchResult.index',
  show: 'matchResult.show',
  create: 'matchResult.create',
  upsert: 'matchResult.upsert',
  patch: 'matchResult.patch',
  destroy: 'matchResult.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var matchResultIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './match-result.controller': matchResultStub
});

describe('Match Result API Router:', function() {
  it('should return an express router instance', function() {
    matchResultIndex.should.equal(routerStub);
  });

  describe('GET /api/match-results', function() {
    it('should route to match-result.controller.index', function() {
      routerStub.get
        .withArgs('/', 'matchResult.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/match-results/:id', function() {
    it('should route to match-result.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'matchResult.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/match-results', function() {
    it('should route to match-result.controller.create', function() {
      routerStub.post
        .withArgs('/', 'matchResult.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/match-results/:id', function() {
    it('should route to match-result.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'matchResult.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/match-results/:id', function() {
    it('should route to match-result.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'matchResult.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/match-results/:id', function() {
    it('should route to match-result.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'matchResult.destroy')
        .should.have.been.calledOnce;
    });
  });
});
