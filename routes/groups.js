var express = require('express');
var router = express.Router();
var groups = require('../models/groups');

router.get('/', function(req, res, next) {
  let _groups = groups.getGroups();

  res.send({ ok: true, groups: _groups });
});

module.exports = router;
