/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/leagues              ->  index
 * POST    /api/leagues              ->  create
 * GET     /api/leagues/:id          ->  show
 * PUT     /api/leagues/:id          ->  upsert
 * PATCH   /api/leagues/:id          ->  patch
 * DELETE  /api/leagues/:id          ->  destroy
 */

'use strict';

import {League, Player} from '../../sqldb';
import apiutils from '../api.utils';
import stringutils from '../string.utils';

// Gets a list of Leagues
export function index(req, res) {
  return League.findAll({
    include: [{
      model: Player,
      where: { userId: req.user },
      as: 'players'
    }]
  })
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Gets a single League from the DB
export function show(req, res) {
  return League.find({
    where: {
      code: req.params.code
    },
    include: [{
      model: Player,
      as: 'players'
    }]
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Creates a new League in the DB
export function create(req, res) {
  req.body.createdBy = req.user;
  req.body.updatedBy = req.user;
  req.body.code = stringutils.generateRandString();
  return League.create(req.body)
    .then(apiutils.respondWithResult(res, 201))
    .catch(apiutils.handleError(res));
}

// Upserts the given League in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  req.body.updatedBy = req.user;
  return League.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Updates an existing League in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  req.body.updatedBy = req.user;
  return League.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.patchUpdates(req, req.body))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Deletes a League from the DB
export function destroy(req, res) {
  return League.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.removeEntity(res))
    .catch(apiutils.handleError(res));
}
