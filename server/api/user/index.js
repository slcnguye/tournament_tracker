'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/me', controller.self);
router.patch('/me', controller.patch);

module.exports = router;
