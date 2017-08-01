/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/matchs              ->  index
 * POST    /api/matchs              ->  create
 * GET     /api/matchs/:id          ->  show
 * PUT     /api/matchs/:id          ->  upsert
 * PATCH   /api/matchs/:id          ->  patch
 * DELETE  /api/matchs/:id          ->  destroy
 */

'use strict';

import {Match, MatchResult} from '../../sqldb';
import apiutils from '../api.utils';

// Gets a list of Matchs
export function index(req, res) {
  return Match.findAll({
    where: {
      tournamentId: req.query.tournamentId
    },
    include: [MatchResult],
    order: [
      [MatchResult, 'scoreDelta', 'DESC']
    ]
  })
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Gets a single Match from the DB
export function show(req, res) {
  return Match.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Creates a new Match in the DB
export function create(req, res) {
  return Match.create(req.body)
    .then(apiutils.respondWithResult(res, 201))
    .catch(apiutils.handleError(res));
}

// Upserts the given Match in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return Match.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Updates an existing Match in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Match.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.patchUpdates(req.body))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Deletes a Match from the DB
export function destroy(req, res) {
  return Match.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.removeEntity(res))
    .catch(apiutils.handleError(res));
}
