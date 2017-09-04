/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import config from './config/environment';
import jwt from 'jsonwebtoken';
import path from 'path';
import moment from 'moment';

export default function(app) {
  function ensureAuthenticated(req, res, next) {
    if(!req.header('Authorization')) {
      return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    const token = req.header('Authorization').split(' ')[1];

    let payload = null;
    try {
      payload = jwt.verify(token, config.tokenSecret);
    } catch(err) {
      return res.status(401).send({ message: err.message });
    }

    if(payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Token has expired' });
    }
    req.user = payload.sub;
    next();
  }

  app.use('/api/configs', require('./api/config'));
  app.use('/api/tournaments', ensureAuthenticated, require('./api/tournament'));
  app.use('/api/players', ensureAuthenticated, require('./api/player'));
  app.use('/api/matches', ensureAuthenticated, require('./api/match'));
  app.use('/api/tournament-players', ensureAuthenticated, require('./api/tournament-player'));
  app.use('/api/tournament-player-notes', ensureAuthenticated, require('./api/tournament-player-note'));
  app.use('/api/match-results', ensureAuthenticated, require('./api/match-result'));
  app.use('/api/users', ensureAuthenticated, require('./api/user'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
