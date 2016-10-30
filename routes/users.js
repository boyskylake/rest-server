var express = require('express');
var router = express.Router();
var PouchDB = require('pouchdb');

var db = new PouchDB('users');

router.get('/', (req, res, next) => {

  db.allDocs({
    include_docs: true
  })
    .then(result => {
      let users = [];
      result.rows.forEach(v => {
        // console.log(v.id)
        let obj = {};
        obj.id = v.id;
        obj.username = v.doc.username;
        obj.name = v.doc.name;
        obj.email = v.doc.email;
        obj.group_id = v.doc.group_id;
        users.push(obj)
      });
      res.send({ ok: true, rows: users })
    })
    .catch(err => {
      res.send({ ok: false, err: err });
    });
});

router.post('/', (req, res, next) => {
  let username = req.body.username;
  let name = req.body.name;
  let email = req.body.email;
  let group_id = +req.body.group_id;

  if (username && name && email && group_id) {
    var doc = {
      "_id": username,
      "username": username,
      "name": name,
      "email": email,
      "group_id": group_id
    };

    db.put(doc)
      .then(() => {
        res.send({ ok: true })
      })
      .catch(err => res.send({ ok: false, err: err }));
    
  } else {
    res.send({ ok: false, err: 'Invalid data' });
  } 

});

router.get('/:username', (req, res, next) => {
  let username = req.params.username;
  db.get(username)
    .then(doc => {
      let obj = {
        id: doc._id,
        username: doc.username,
        name: doc.name,
        email: doc.email,
        group_id: doc.group_id
      }
      res.send({ok: true, user: obj})
    })
    .then(() => res.send({ ok: true }))
    .catch(err => res.send({ ok: false, err: err }));
});

router.delete('/:username', (req, res, next) => {
  let username = req.params.username;
  console.log(username)
  db.get(username)
    .then(doc => {
      console.log(doc)
      return db.remove(doc);
    })
    .then(() => res.send({ ok: true }))
    .catch(err => res.send({ ok: false, err: err }));
});

router.put('/', (req, res, next) => {
  let username = req.body.username;
  let name = req.body.name;
  let email = req.body.email;
  let group_id = req.body.group_id;

  if (username && name && email && group_id) {
    db.get(username)
      .then(doc => {
        var _doc = {
          "_id": username,
          "_rev": doc._rev,
          "name": name,
          "email": email,
          "group_id": group_id
        };
        return db.put(_doc);
      })
      .then(() => res.send({ ok: true }))
      .catch(err => res.send({ ok: false, err: err }));
    
  } else {
    res.send({ ok: false, err: 'Invalid data' });
  }
});

module.exports = router;
