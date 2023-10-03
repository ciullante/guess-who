"use strict";

const db = require("../database/db");
const { Item } = require("../models/models");

function getItemsByDifficult(difficult) {
  const n = 12 * difficult;
  return new Promise((resolve, rejects) => {
    const sql = "SELECT * FROM items ORDER BY RANDOM() LIMIT ?";
    db.all(sql, n, (err, rows) => {
      if (err) {
        rejects(err);
      } else if (rows.length !== n) {
        rejects(new Error("Error: Invalid difficult"));
      } else {
        const items = rows.map(
          (row) =>
            new Item(
              row.id,
              row.name,
              row.path,
              row.color,
              row.nature,
              row.locomotion,
              row.origin,
              row.size
            )
        );
        resolve(items);
      }
    });
  });
}

function getItemByID(id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * " + "FROM items " + "WHERE id = ? ";
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else if (!row) reject(new Error("Error: Item not found"));
      else
        resolve(
          new Item(
            row.id,
            row.name,
            row.path,
            row.color,
            row.nature,
            row.locomotion,
            row.origin,
            row.size
          )
        );
    });
  });
}

function getItemByName(name) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * " + "FROM items " + "WHERE name = ? ";
    db.get(sql, [name], (err, row) => {
      if (err) reject(err);
      else if (!row) reject(new Error("Error: Item not found"));
      else
        resolve(
          new Item(
            row.id,
            row.name,
            row.path,
            row.color,
            row.nature,
            row.locomotion,
            row.origin,
            row.size
          )
        );
    });
  });
}

function getItemByGame(gameID) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT I.id, name " +
      "FROM games AS G, items AS I " +
      "WHERE G.secretID = I.id AND G.id = ?";
    db.get(sql, [gameID], (err, row) => {
      if (err) reject(err);
      else if (!row) reject(new Error("Error: Item not found"));
      else {
        resolve(row);
      }
    });
  });
}

module.exports = { getItemsByDifficult, getItemByID, getItemByGame, getItemByName};
