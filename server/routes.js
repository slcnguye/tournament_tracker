/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import config from './config/environment';
import jwt from 'jsonwebtoken';
import path from 'path';
import moment from 'moment';
import {League} from './sqldb';

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
    return next();
  }


  app.param('leagueCode', function(req, res, next, leagueCode) {
    console.log('checking code: ', leagueCode);
    if(!leagueCode) {
      return res.status(401).send({ message: 'No league code found' });
    }

    League.find({
      where: {
        code: leagueCode
      }
    }).then(league => {
      if(!league) {
        return res.status(401).send({ message: 'Invalid league code'});
      } else {
        req.league = league._id;
        return next();
      }
    });
  });

  app.use('/api/configs', require('./api/config'));
  app.use('/api/users', ensureAuthenticated, require('./api/user'));
  app.use('/api/leagues', ensureAuthenticated, require('./api/league'));
  app.use('/api/leagues/:leagueCode/tournaments', ensureAuthenticated, require('./api/tournament'));
  app.use('/api/leagues/:leagueCode/players', ensureAuthenticated, require('./api/player'));
  app.use('/api/leagues/:leagueCode/matches', ensureAuthenticated, require('./api/match'));
  app.use('/api/leagues/:leagueCode/tournament-players', ensureAuthenticated, require('./api/tournament-player'));
  app.use('/api/leagues/:leagueCode/tournament-player-notes', ensureAuthenticated, require('./api/tournament-player-note'));
  app.use('/api/leagues/:leagueCode/match-results', ensureAuthenticated, require('./api/match-result'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
