'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newMatch;

describe('Match API:', function() {
  describe('GET /api/matchs', function() {
    var matchs;

    beforeEach(function(done) {
      request(app)
        .get('/api/matchs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          matchs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      matchs.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/matchs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/matchs')
        .send({
          name: 'New Match'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMatch = res.body;
          done();
        });
    });

    it('should respond with the newly created match', function() {
      newMatch.name.should.equal('New Match');
    });
  });

  describe('GET /api/matchs/:id', function() {
    var match;

    beforeEach(function(done) {
      request(app)
        .get(`/api/matchs/${newMatch._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          match = res.body;
          done();
        });
    });

    afterEach(function() {
      match = {};
    });

    it('should respond with the requested match', function() {
      match.name.should.equal('New Match');
    });
  });

  describe('PUT /api/matchs/:id', function() {
    var updatedMatch;

    beforeEach(function(done) {
      request(app)
        .put(`/api/matchs/${newMatch._id}`)
        .send({
          name: 'Updated Match'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMatch = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMatch = {};
    });

    it('should respond with the updated match', function() {
      updatedMatch.name.should.equal('Updated Match');
    });

    it('should respond with the updated match on a subsequent GET', function(done) {
      request(app)
        .get(`/api/matchs/${newMatch._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let match = res.body;

          match.name.should.equal('Updated Match');

          done();
        });
    });
  });

  describe('PATCH /api/matchs/:id', function() {
    var patchedMatch;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/matchs/${newMatch._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Match' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMatch = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMatch = {};
    });

    it('should respond with the patched match', function() {
      patchedMatch.name.should.equal('Patched Match');
    });
  });

  describe('DELETE /api/matchs/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/matchs/${newMatch._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when match does not exist', function(done) {
      request(app)
        .delete(`/api/matchs/${newMatch._id}`)
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
