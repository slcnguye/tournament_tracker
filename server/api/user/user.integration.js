'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newUser;

describe('User API:', function() {
  describe('GET /api/users', function() {
    var users;

    beforeEach(function(done) {
      request(app)
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          users = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      users.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/users', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/users')
        .send({
          name: 'New User'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newUser = res.body;
          done();
        });
    });

    it('should respond with the newly created user', function() {
      newUser.name.should.equal('New User');
    });
  });

  describe('GET /api/users/:id', function() {
    var user;

    beforeEach(function(done) {
      request(app)
        .get(`/api/users/${newUser._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          user = res.body;
          done();
        });
    });

    afterEach(function() {
      user = {};
    });

    it('should respond with the requested user', function() {
      user.name.should.equal('New User');
    });
  });

  describe('PUT /api/users/:id', function() {
    var updatedUser;

    beforeEach(function(done) {
      request(app)
        .put(`/api/users/${newUser._id}`)
        .send({
          name: 'Updated User'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedUser = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUser = {};
    });

    it('should respond with the updated user', function() {
      updatedUser.name.should.equal('Updated User');
    });

    it('should respond with the updated user on a subsequent GET', function(done) {
      request(app)
        .get(`/api/users/${newUser._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let user = res.body;

          user.name.should.equal('Updated User');

          done();
        });
    });
  });

  describe('PATCH /api/users/:id', function() {
    var patchedUser;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/users/${newUser._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched User' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedUser = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedUser = {};
    });

    it('should respond with the patched user', function() {
      patchedUser.name.should.equal('Patched User');
    });
  });

  describe('DELETE /api/users/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/users/${newUser._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when user does not exist', function(done) {
      request(app)
        .delete(`/api/users/${newUser._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
