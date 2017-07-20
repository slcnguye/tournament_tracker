'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var tournamentPlayerStub = {
  index: 'tournamentPlayer.index',
  show: 'tournamentPlayer.show',
  create: 'tournamentPlayer.create',
  upsert: 'tournamentPlayer.upsert',
  patch: 'tournamentPlayer.patch',
  destroy: 'tournamentPlayer.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tournamentPlayerIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './tournament-player.controller': tournamentPlayerStub
});

describe('Tournament Player API Router:', function() {
  it('should return an express router instance', function() {
    tournamentPlayerIndex.should.equal(routerStub);
  });

  describe('GET /api/tournament-players', function() {
    it('should route to tournament-player.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tournamentPlayer.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/tournament-players/:id', function() {
    it('should route to tournament-player.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tournamentPlayer.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/tournament-players', function() {
    it('should route to tournament-player.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tournamentPlayer.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/tournament-players/:id', function() {
    it('should route to tournament-player.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'tournamentPlayer.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/tournament-players/:id', function() {
    it('should route to tournament-player.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'tournamentPlayer.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/tournament-players/:id', function() {
    it('should route to tournament-player.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tournamentPlayer.destroy')
        .should.have.been.calledOnce;
    });
  });
});
