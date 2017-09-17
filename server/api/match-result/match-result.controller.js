/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/match-results              ->  index
 * POST    /api/match-results              ->  create
 * GET     /api/match-results/:id          ->  show
 * PUT     /api/match-results/:id          ->  upsert
 * PATCH   /api/match-results/:id          ->  patch
 * DELETE  /api/match-results/:id          ->  destroy
 */

'use strict';

import {MatchResult} from '../../sqldb';
import apiutils from '../api.utils';

// Gets a list of MatchResults
export function index(req, res) {
  return MatchResult.findAll({
    where: {
      matchId: req.query.matchId
    }
  })
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Gets a single MatchResult from the DB
export function show(req, res) {
  return MatchResult.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Creates a new MatchResult in the DB
export function create(req, res) {
  req.body.createdBy = req.user;
  req.body.updatedBy = req.user;
  return MatchResult.create(req.body)
    .then(apiutils.respondWithResult(res, 201))
    .catch(apiutils.handleError(res));
}

// Upserts the given MatchResult in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  req.body.updatedBy = req.user;
  return MatchResult.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Updates an existing MatchResult in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  req.body.updatedBy = req.user;
  return MatchResult.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.patchUpdates(req, req.body))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Deletes a MatchResult from the DB
export function destroy(req, res) {
  return MatchResult.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.removeEntity(res))
    .catch(apiutils.handleError(res));
}
