/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tournament-player-notes              ->  index
 * POST    /api/tournament-player-notes              ->  create
 * GET     /api/tournament-player-notes/:id          ->  show
 * PUT     /api/tournament-player-notes/:id          ->  upsert
 * PATCH   /api/tournament-player-notes/:id          ->  patch
 * DELETE  /api/tournament-player-notes/:id          ->  destroy
 */

'use strict';

import {TournamentPlayerNote} from '../../sqldb';
import apiutils from '../api.utils';

// Gets a list of TournamentPlayerNotes
export function index(req, res) {
  return TournamentPlayerNote.findAll({
    where: {
      tournamentPlayerId: req.query.tournamentPlayerId
    }
  })
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Gets a single TournamentPlayerNote from the DB
export function show(req, res) {
  return TournamentPlayerNote.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Creates a new TournamentPlayerNote in the DB
export function create(req, res) {
  return TournamentPlayerNote.create(req.body)
    .then(apiutils.respondWithResult(res, 201))
    .catch(apiutils.handleError(res));
}

// Upserts the given TournamentPlayerNote in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return TournamentPlayerNote.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Updates an existing TournamentPlayerNote in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return TournamentPlayerNote.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.patchUpdates(req.body))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Deletes a TournamentPlayerNote from the DB
export function destroy(req, res) {
  return TournamentPlayerNote.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.removeEntity(res))
    .catch(apiutils.handleError(res));
}
