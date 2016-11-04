let express = require('express');
let router = express.Router();
let PouchDB = require('pouchdb');

let db = new PouchDB('users');
let moment = require('moment');

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
  let id = moment().format('x');

  if (username && name && email && group_id) {
    var doc = {
      "_id": id,
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

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  db.get(id)
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

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  db.get(id)
    .then(doc => {
      console.log(doc)
      return db.remove(doc);
    })
    .then(() => res.send({ ok: true }))
    .catch(err => res.send({ ok: false, err: err }));
});

router.put('/', (req, res, next) => {
  let id = req.body.id;
  let name = req.body.name;
  let email = req.body.email;
  let group_id = req.body.group_id;

  if (id && name && email && group_id) {
    db.get(id)
      .then(doc => {
        var _doc = {
          "_id": id,
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
