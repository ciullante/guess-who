'use strict';

const sqlite = require('sqlite3')

const db = new sqlite.Database("./database/db.sqlite", (err) => {
  if (err) throw err;
});

module.exports = db;