/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tournament-players              ->  index
 * POST    /api/tournament-players              ->  create
 * GET     /api/tournament-players/:id          ->  show
 * PUT     /api/tournament-players/:id          ->  upsert
 * PATCH   /api/tournament-players/:id          ->  patch
 * DELETE  /api/tournament-players/:id          ->  destroy
 */

'use strict';

import {TournamentPlayer} from '../../sqldb';
import apiutils from '../api.utils';


// Gets a list of TournamentPlayers
export function index(req, res) {
  const query = {
    where: {}
  };
  if(req.query.tournamentId) {
    query.where.tournamentId = req.query.tournamentId;
  }
  return TournamentPlayer.findAll(query)
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Gets a single TournamentPlayer from the DB
export function show(req, res) {
  return TournamentPlayer.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Creates a new TournamentPlayer in the DB
export function create(req, res) {
  req.body.createdBy = req.user;
  req.body.updatedBy = req.user;
  return TournamentPlayer.create(req.body)
    .then(apiutils.respondWithResult(res, 201))
    .catch(apiutils.handleError(res));
}

// Upserts the given TournamentPlayer in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  req.body.updatedBy = req.user;
  return TournamentPlayer.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Updates an existing TournamentPlayer in the DB
export function patch(req, res) {
  if(req.body.id) {
    Reflect.deleteProperty(req.body, 'id');
  }
  return TournamentPlayer.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.patchUpdates(req, req.body))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Deletes a TournamentPlayer from the DB
export function destroy(req, res) {
  return TournamentPlayer.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.removeEntity(res))
    .catch(apiutils.handleError(res));
}
