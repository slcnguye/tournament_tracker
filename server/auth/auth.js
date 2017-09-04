'use strict';

import request from 'request';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import {User} from '../sqldb';

export default function(app) {
  function createJWT(user) {
    const payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(14, 'days')
            .unix()
    };
    return jwt.sign(payload, config.tokenSecret);
  }

  app.post('/auth/google', function(req, res) {
    const accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    const peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me';
    const params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: config.auth.google.clientSecret,
      redirect_uri: req.body.redirectUri,
      grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, { json: true, form: params }, (err, response, token) => {
      const accessToken = token.access_token;
      const headers = { Authorization: `Bearer ${accessToken}` };

      // Step 2. Retrieve profile information about the current user.
      request.get({ url: peopleApiUrl, headers, json: true }, (err, response, profile) => {
        if(profile.error) {
          return res.status(500).send({message: profile.error.message});
        }
        // Step 3. Create a new user account or return an existing one.
        User.find({ where: { google: profile.id }}).then(existingUser => {
          if(existingUser) {
            return res.send({ token: createJWT(existingUser) });
          }
          User.build({
            google: profile.id,
            picture: !profile.image.isDefault ? profile.image.url.replace('sz=50', 'sz=200') : null,
            name: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            link: profile.url
          }).save()
            .then(savedUser => {
              res.send({ token: createJWT(savedUser) });
            });
        });
      });
    });
  });

  app.post('/auth/facebook', function(req, res) {
    const fields = ['id', 'email', 'first_name', 'last_name', 'picture', 'name', 'link'];
    const accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    const graphApiUrl = `https://graph.facebook.com/v2.5/me?fields=${fields.join(',')}`;
    const params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: config.auth.facebook.clientSecret,
      redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({ url: accessTokenUrl, qs: params, json: true }, (err, response, accessToken) => {
      if(response.statusCode !== 200) {
        return res.status(500).send({ message: accessToken.error.message });
      }

      // Step 2. Retrieve profile information about the current user.
      request.get({ url: graphApiUrl, qs: accessToken, json: true }, (err, response, profile) => {
        if(response.statusCode !== 200) {
          return res.status(500).send({ message: profile.error.message });
        }
          // Step 3. Create a new user account or return an existing one.
        User.find({ where: { facebook: profile.id }}).then(existingUser => {
          if(existingUser) {
            return res.send({ token: createJWT(existingUser) });
          }
          User.build({
            facebook: profile.id,
            picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
            name: profile.name,
            firstName: profile.first_name,
            lastName: profile.last_name,
            link: profile.link
          }).save()
            .then(savedUser => {
              res.send({ token: createJWT(savedUser) });
            });
        });
      });
    });
  });
}
