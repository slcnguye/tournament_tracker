'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newTournamentPlayer;

describe('TournamentPlayer API:', function() {
  describe('GET /api/tournament-players', function() {
    var tournamentPlayers;

    beforeEach(function(done) {
      request(app)
        .get('/api/tournament-players')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          tournamentPlayers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tournamentPlayers.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/tournament-players', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tournament-players')
        .send({
          name: 'New TournamentPlayer'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTournamentPlayer = res.body;
          done();
        });
    });

    it('should respond with the newly created tournamentPlayer', function() {
      newTournamentPlayer.name.should.equal('New TournamentPlayer');
    });

  });

  describe('GET /api/tournament-players/:id', function() {
    var tournamentPlayer;

    beforeEach(function(done) {
      request(app)
        .get(`/api/tournament-players/${newTournamentPlayer._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          tournamentPlayer = res.body;
          done();
        });
    });

    afterEach(function() {
      tournamentPlayer = {};
    });

    it('should respond with the requested tournamentPlayer', function() {
      tournamentPlayer.name.should.equal('New TournamentPlayer');
    });
  });

  describe('PUT /api/tournament-players/:id', function() {
    var updatedTournamentPlayer;

    beforeEach(function(done) {
      request(app)
        .put(`/api/tournament-players/${newTournamentPlayer._id}`)
        .send({
          name: 'Updated TournamentPlayer'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTournamentPlayer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTournamentPlayer = {};
    });

    it('should respond with the updated tournamentPlayer', function() {
      updatedTournamentPlayer.name.should.equal('Updated TournamentPlayer');
    });

    it('should respond with the updated tournamentPlayer on a subsequent GET', function(done) {
      request(app)
        .get(`/api/tournament-players/${newTournamentPlayer._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let tournamentPlayer = res.body;

          tournamentPlayer.name.should.equal('Updated TournamentPlayer');

          done();
        });
    });
  });

  describe('PATCH /api/tournament-players/:id', function() {
    var patchedTournamentPlayer;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/tournament-players/${newTournamentPlayer._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched TournamentPlayer' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTournamentPlayer = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTournamentPlayer = {};
    });

    it('should respond with the patched tournamentPlayer', function() {
      patchedTournamentPlayer.name.should.equal('Patched TournamentPlayer');
    });
  });

  describe('DELETE /api/tournament-players/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/tournament-players/${newTournamentPlayer._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tournamentPlayer does not exist', function(done) {
      request(app)
        .delete(`/api/tournament-players/${newTournamentPlayer._id}`)
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
