/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/tournaments', require('./api/tournament'));
  app.use('/api/players', require('./api/player'));
  app.use('/api/matches', require('./api/match'));
  app.use('/api/tournament-players', require('./api/tournament-player'));
  app.use('/api/tournament-player-notes', require('./api/tournament-player-note'));
  app.use('/api/match-results', require('./api/match-result'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
