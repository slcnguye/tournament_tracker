'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var leagueCtrlStub = {
  index: 'leagueCtrl.index',
  show: 'leagueCtrl.show',
  create: 'leagueCtrl.create',
  upsert: 'leagueCtrl.upsert',
  patch: 'leagueCtrl.patch',
  destroy: 'leagueCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var leagueIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './league.controller': leagueCtrlStub
});

describe('League API Router:', function() {
  it('should return an express router instance', function() {
    leagueIndex.should.equal(routerStub);
  });

  describe('GET /api/leagues', function() {
    it('should route to league.controller.index', function() {
      routerStub.get
        .withArgs('/', 'leagueCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/leagues/:id', function() {
    it('should route to league.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'leagueCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/leagues', function() {
    it('should route to league.controller.create', function() {
      routerStub.post
        .withArgs('/', 'leagueCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/leagues/:id', function() {
    it('should route to league.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'leagueCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/leagues/:id', function() {
    it('should route to league.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'leagueCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/leagues/:id', function() {
    it('should route to league.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'leagueCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
