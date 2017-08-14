/**
 * Main application file
 */

'use strict';

import express from 'express';
import migration from './migration';
import config from './config/environment';
import http from 'http';
import seedDatabaseIfNeeded from './config/seed';

// Setup server
let app = express();
let server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

migration()
  .then(seedDatabaseIfNeeded)
  .then(startServer)
  .catch(function(err) {
    console.log('Server failed to start due to error: %s', err);
  });

// Expose app
exports = module.exports = app;
