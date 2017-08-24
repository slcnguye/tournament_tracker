'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newTournamentPlayerNote;

describe('TournamentPlayerNote API:', function() {
  describe('GET /api/tournament-player-notes', function() {
    var tournamentPlayerNotes;

    beforeEach(function(done) {
      request(app)
        .get('/api/tournament-player-notes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          tournamentPlayerNotes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tournamentPlayerNotes.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/tournament-player-notes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tournament-player-notes')
        .send({
          name: 'New TournamentPlayerNote'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTournamentPlayerNote = res.body;
          done();
        });
    });

    it('should respond with the newly created tournamentPlayerNote', function() {
      newTournamentPlayerNote.name.should.equal('New TournamentPlayerNote');
    });
  });

  describe('GET /api/tournament-player-notes/:id', function() {
    var tournamentPlayerNote;

    beforeEach(function(done) {
      request(app)
        .get(`/api/tournament-player-notes/${newTournamentPlayerNote._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          tournamentPlayerNote = res.body;
          done();
        });
    });

    afterEach(function() {
      tournamentPlayerNote = {};
    });

    it('should respond with the requested tournamentPlayerNote', function() {
      tournamentPlayerNote.name.should.equal('New TournamentPlayerNote');
    });
  });

  describe('PUT /api/tournament-player-notes/:id', function() {
    var updatedTournamentPlayerNote;

    beforeEach(function(done) {
      request(app)
        .put(`/api/tournament-player-notes/${newTournamentPlayerNote._id}`)
        .send({
          name: 'Updated TournamentPlayerNote'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTournamentPlayerNote = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTournamentPlayerNote = {};
    });

    it('should respond with the updated tournamentPlayerNote', function() {
      updatedTournamentPlayerNote.name.should.equal('Updated TournamentPlayerNote');
    });

    it('should respond with the updated tournamentPlayerNote on a subsequent GET', function(done) {
      request(app)
        .get(`/api/tournament-player-notes/${newTournamentPlayerNote._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let tournamentPlayerNote = res.body;

          tournamentPlayerNote.name.should.equal('Updated TournamentPlayerNote');

          done();
        });
    });
  });

  describe('PATCH /api/tournament-player-notes/:id', function() {
    var patchedTournamentPlayerNote;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/tournament-player-notes/${newTournamentPlayerNote._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched TournamentPlayerNote' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTournamentPlayerNote = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTournamentPlayerNote = {};
    });

    it('should respond with the patched tournamentPlayerNote', function() {
      patchedTournamentPlayerNote.name.should.equal('Patched TournamentPlayerNote');
    });
  });

  describe('DELETE /api/tournament-player-notes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/tournament-player-notes/${newTournamentPlayerNote._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tournamentPlayerNote does not exist', function(done) {
      request(app)
        .delete(`/api/tournament-player-notes/${newTournamentPlayerNote._id}`)
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
