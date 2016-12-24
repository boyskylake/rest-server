var express = require('express');
var router = express.Router();

router.post('/register', function(req, res, next) {
  let token = req.body.token;
  console.log(token);
  res.send({ ok: true });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username == 'admin' && password == 'admin') {
    res.send({ ok: true, fullname: 'John Doe' });
  } else {
    res.send({ ok: false, msg: 'Invalid username/password' });
  }
});

router.get('/logout', (req, res, next) => {

  res.send({ ok: true });
  
});

module.exports = router;
