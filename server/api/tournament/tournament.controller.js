/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tournaments              ->  index
 * POST    /api/tournaments              ->  create
 * GET     /api/tournaments/:id          ->  show
 * PUT     /api/tournaments/:id          ->  upsert
 * PATCH   /api/tournaments/:id          ->  patch
 * DELETE  /api/tournaments/:id          ->  destroy
 */

'use strict';

import {Tournament} from '../../sqldb';
import apiutils from '../api.utils';

// Gets a list of Tournaments
export function index(req, res) {
  return Tournament.findAll()
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Gets a single Tournament from the DB
export function show(req, res) {
  return Tournament.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Creates a new Tournament in the DB
export function create(req, res) {
  req.body.createdBy = req.user;
  req.body.updatedBy = req.user;
  req.body.leagueId = req.league;
  return Tournament.create(req.body)
    .then(apiutils.respondWithResult(res, 201))
    .catch(apiutils.handleError(res));
}

// Upserts the given Tournament in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  req.body.updatedBy = req.user;
  return Tournament.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Updates an existing Tournament in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Tournament.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.patchUpdates(req, req.body))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Deletes a Tournament from the DB
export function destroy(req, res) {
  return Tournament.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.removeEntity(res))
    .catch(apiutils.handleError(res));
}
