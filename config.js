var db = new PouchDB('kittens');

module.exports = {
  getDb() {
    return db;
  }
}
