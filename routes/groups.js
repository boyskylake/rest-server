var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let groups = [
    {id: 1, name: 'Admin'},
    {id: 2, name: 'Staff'},
    {id: 3, name: 'Guest'},
  ];

  res.send({ ok: true, rows: groups });
});

module.exports = router;
