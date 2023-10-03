"use strict";

const db = require("../database/db");
const { Property } = require("../models/models");

function getProperties() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM properties";
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      else if (!rows) reject(new Error("Error: properties not found"));
      else
        resolve(
          rows.map((row) => {
            const values = row.values.split(",");
            return new Property(row.id, row.name, values);
          })
        );
    });
  });
}

function getPropertyByName(name) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM properties WHERE name = ?";
    db.get(sql, [name], (err, row) => {
      if (err) reject(err);
      else if (!row) reject(new Error("Property not found"));
      else {
        const values = row.values.split(",");
        resolve(new Property(row.id, row.name, values));
      }
    });
  });
}

module.exports = { getProperties, getPropertyByName };
