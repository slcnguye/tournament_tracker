'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newMatchResult;

describe('MatchResult API:', function() {
  describe('GET /api/match-results', function() {
    var matchResults;

    beforeEach(function(done) {
      request(app)
        .get('/api/match-results')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          matchResults = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      matchResults.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/match-results', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/match-results')
        .send({
          name: 'New MatchResult'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMatchResult = res.body;
          done();
        });
    });

    it('should respond with the newly created matchResult', function() {
      newMatchResult.name.should.equal('New MatchResult');
    });

  });

  describe('GET /api/match-results/:id', function() {
    var matchResult;

    beforeEach(function(done) {
      request(app)
        .get(`/api/match-results/${newMatchResult._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          matchResult = res.body;
          done();
        });
    });

    afterEach(function() {
      matchResult = {};
    });

    it('should respond with the requested matchResult', function() {
      matchResult.name.should.equal('New MatchResult');
    });
  });

  describe('PUT /api/match-results/:id', function() {
    var updatedMatchResult;

    beforeEach(function(done) {
      request(app)
        .put(`/api/match-results/${newMatchResult._id}`)
        .send({
          name: 'Updated MatchResult'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMatchResult = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMatchResult = {};
    });

    it('should respond with the updated matchResult', function() {
      updatedMatchResult.name.should.equal('Updated MatchResult');
    });

    it('should respond with the updated matchResult on a subsequent GET', function(done) {
      request(app)
        .get(`/api/match-results/${newMatchResult._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let matchResult = res.body;

          matchResult.name.should.equal('Updated MatchResult');

          done();
        });
    });
  });

  describe('PATCH /api/match-results/:id', function() {
    var patchedMatchResult;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/match-results/${newMatchResult._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched MatchResult' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMatchResult = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMatchResult = {};
    });

    it('should respond with the patched matchResult', function() {
      patchedMatchResult.name.should.equal('Patched MatchResult');
    });
  });

  describe('DELETE /api/match-results/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/match-results/${newMatchResult._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when matchResult does not exist', function(done) {
      request(app)
        .delete(`/api/match-results/${newMatchResult._id}`)
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
