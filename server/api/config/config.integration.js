'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

describe('Config API:', function() {
  describe('GET /api/configs', function() {
    var configs;

    beforeEach(function(done) {
      request(app)
        .get('/api/configs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          configs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      configs.should.be.instanceOf(Array);
    });
  });
});
