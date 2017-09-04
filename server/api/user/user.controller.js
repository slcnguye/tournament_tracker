/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  show
 * PUT     /api/users/:id          ->  upsert
 * PATCH   /api/users/:id          ->  patch
 * DELETE  /api/users/:id          ->  destroy
 */

'use strict';

import {User} from '../../sqldb';
import apiutils from '../api.utils';

// Gets a list of Users
export function index(req, res) {
  return User.findAll()
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Gets a single User from the DB
export function show(req, res) {
  return User.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Gets a single User from the DB
export function self(req, res) {
  return User.find({
    where: {
      _id: req.user
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Creates a new User in the DB
export function create(req, res) {
  return User.create(req.body)
    .then(apiutils.respondWithResult(res, 201))
    .catch(apiutils.handleError(res));
}

// Upserts the given User in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return User.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Updates an existing User in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return User.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.patchUpdates(req.body))
    .then(apiutils.respondWithResult(res))
    .catch(apiutils.handleError(res));
}

// Deletes a User from the DB
export function destroy(req, res) {
  return User.find({
    where: {
      _id: req.params.id
    }
  })
    .then(apiutils.handleEntityNotFound(res))
    .then(apiutils.removeEntity(res))
    .catch(apiutils.handleError(res));
}
