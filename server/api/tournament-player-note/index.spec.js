'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var tournamentPlayerNoteStub = {
  index: 'tournamentPlayerNote.index',
  show: 'tournamentPlayerNote.show',
  create: 'tournamentPlayerNote.create',
  upsert: 'tournamentPlayerNote.upsert',
  patch: 'tournamentPlayerNote.patch',
  destroy: 'tournamentPlayerNote.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tournamentPlayerNoteIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './match-result.controller': tournamentPlayerNoteStub
});

describe('Match Result API Router:', function() {
  it('should return an express router instance', function() {
    tournamentPlayerNoteIndex.should.equal(routerStub);
  });

  describe('GET /api/match-results', function() {
    it('should route to match-result.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tournamentPlayerNote.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/match-results/:id', function() {
    it('should route to match-result.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tournamentPlayerNote.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/match-results', function() {
    it('should route to match-result.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tournamentPlayerNote.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/match-results/:id', function() {
    it('should route to match-result.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'tournamentPlayerNote.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/match-results/:id', function() {
    it('should route to match-result.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'tournamentPlayerNote.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/match-results/:id', function() {
    it('should route to match-result.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tournamentPlayerNote.destroy')
        .should.have.been.calledOnce;
    });
  });
});
