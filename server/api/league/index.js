'use strict';

var express = require('express');
var controller = require('./league.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:code', controller.show);
router.post('/', controller.create);
router.put('/:code', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:code', controller.destroy);

module.exports = router;
