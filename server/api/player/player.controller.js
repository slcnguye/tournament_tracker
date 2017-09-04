/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/players              ->  index
 * POST    /api/players              ->  create
 * GET     /api/players/:id          ->  show
 * PUT     /api/players/:id          ->  upsert
 * PATCH   /api/players/:id          ->  patch
 * DELETE  /api/players/:id          ->  destroy
 */

'use strict';

import {Player} from '../../sqldb';
import apiutils from '../api.utils';

// Gets a list of Players
export function index(req, res) {
  return Player.findAll()
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Gets a single Player from the DB
export function show(req, res) {
  return Player.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Creates a new Player in the DB
export function create(req, res) {
  req.body.createdBy = req.user;
  req.body.updatedBy = req.user;
  return Player.create(req.body)
    .then(apiutils.respondWithResult(res, 201))
    .catch(apiutils.handleError(res));
}

// Upserts the given Player in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  req.body.updatedBy = req.user;
  return Player.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Updates an existing Player in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Player.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.patchUpdates(req, req.body))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Deletes a Player from the DB
export function destroy(req, res) {
  return Player.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.removeEntity(res))
    .catch(apiutils.handleError(res));
}
