/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/configs              ->  index
 * POST    /api/configs              ->  create
 * GET     /api/configs/:id          ->  show
 * PUT     /api/configs/:id          ->  upsert
 * PATCH   /api/configs/:id          ->  patch
 * DELETE  /api/configs/:id          ->  destroy
 */

'use strict';

import apiutils from '../api.utils';
import config from '../../config/environment';

// Gets a list of Configs
export function index(req, res) {
  return apiutils.respondWithResult(res)(config.facebook);
}
