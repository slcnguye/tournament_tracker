'use strict';

import _ from 'lodash';

let apiutils = {};

apiutils.respondWithResult = function(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
};

apiutils.patchUpdates = function(req, patches) {
  return function(entity) {
    patches.updatedBy = req.user;
    _.each(patches, (value, key) => {
      entity[key] = value;
    });
    return entity.save();
  };
};

apiutils.removeEntity = function(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
};

apiutils.handleEntityNotFound = function(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
};

apiutils.handleError = function(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
};

module.exports = apiutils;

