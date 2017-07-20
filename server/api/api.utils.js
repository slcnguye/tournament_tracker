'use strict';

import jsonpatch from 'fast-json-patch';

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

apiutils.patchUpdates = function(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

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

