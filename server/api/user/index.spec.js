'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var userCtrlStub = {
  index: 'userCtrl.index',
  show: 'userCtrl.show',
  create: 'userCtrl.create',
  upsert: 'userCtrl.upsert',
  patch: 'userCtrl.patch',
  destroy: 'userCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var userIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './user.controller': userCtrlStub
});

describe('User API Router:', function() {
  it('should return an express router instance', function() {
    userIndex.should.equal(routerStub);
  });

  describe('GET /api/users', function() {
    it('should route to user.controller.index', function() {
      routerStub.get
        .withArgs('/', 'userCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/users/:id', function() {
    it('should route to user.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'userCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/users', function() {
    it('should route to user.controller.create', function() {
      routerStub.post
        .withArgs('/', 'userCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/users/:id', function() {
    it('should route to user.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'userCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/users/:id', function() {
    it('should route to user.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'userCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/users/:id', function() {
    it('should route to user.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'userCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
