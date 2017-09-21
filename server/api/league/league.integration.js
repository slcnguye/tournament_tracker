'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newLeague;

describe('League API:', function() {
  describe('GET /api/leagues', function() {
    var leagues;

    beforeEach(function(done) {
      request(app)
        .get('/api/leagues')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          leagues = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      leagues.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/leagues', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/leagues')
        .send({
          name: 'New League',
          completed: false
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newLeague = res.body;
          done();
        });
    });

    it('should respond with the newly created league', function() {
      newLeague.name.should.equal('New League');
      newLeague.completed.should.equal(false);
    });
  });

  describe('GET /api/leagues/:id', function() {
    var league;

    beforeEach(function(done) {
      request(app)
        .get(`/api/leagues/${newLeague._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          league = res.body;
          done();
        });
    });

    afterEach(function() {
      league = {};
    });

    it('should respond with the requested league', function() {
      league.name.should.equal('New League');
      league.completed.should.equal(false);
    });
  });

  describe('PUT /api/leagues/:id', function() {
    var updatedLeague;

    beforeEach(function(done) {
      request(app)
        .put(`/api/leagues/${newLeague._id}`)
        .send({
          name: 'Updated League',
          completed: true
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedLeague = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLeague = {};
    });

    it('should respond with the updated league', function() {
      updatedLeague.name.should.equal('Updated League');
      updatedLeague.completed.should.equal(true);
    });

    it('should respond with the updated league on a subsequent GET', function(done) {
      request(app)
        .get(`/api/leagues/${newLeague._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let league = res.body;

          league.name.should.equal('Updated League');
          league.completed.should.equal(true);

          done();
        });
    });
  });

  describe('PATCH /api/leagues/:id', function() {
    var patchedLeague;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/leagues/${newLeague._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched League' },
          { op: 'replace', path: '/completed', value: false }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedLeague = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedLeague = {};
    });

    it('should respond with the patched league', function() {
      patchedLeague.name.should.equal('Patched League');
      patchedLeague.completed.should.equal(false);
    });
  });

  describe('DELETE /api/leagues/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/leagues/${newLeague._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when league does not exist', function(done) {
      request(app)
        .delete(`/api/leagues/${newLeague._id}`)
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
