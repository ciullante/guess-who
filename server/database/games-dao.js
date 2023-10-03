"use strict";

const db = require("../database/db");
const { Game } = require("../models/models");

function createNewGame(game) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO games(date, difficult, secret, score, playerID, status) VALUES(?,?,?,?,?,?)";
    db.run(
      sql,
      [
        game.date,
        game.difficult,
        game.secret,
        game.score,
        game.playerID,
        game.status,
      ],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
}

function getGameByID(id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM games WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else if (!row) reject(new Error("Error: Game not found"));
      else
        resolve(
          new Game(
            row.id,
            row.date,
            row.difficult,
            row.secret,
            row.score,
            row.playerID,
            row.status
          )
        );
    });
  });
}

function updateGame(game) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE games " + "SET score = ?, status = ? " + "WHERE id = ?";
    db.run(sql, [game.score, game.status, game.id], (err) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
}

function deleteGameByID(id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM games WHERE id = ?";
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

function getGamesByUser(user){
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM games WHERE playerID = ? AND status = 'concluded'";
    db.all(sql, [user.id], (err, rows) => {
      if (err) reject(err);
      if (rows.length === 0) resolve([]);
      else resolve( rows.map((row) => new Game(row.id, row.date, row.difficult, row.secret, row.score, row.playerID, row.status)))
    })
  })
}

module.exports = { createNewGame, getGameByID, updateGame, deleteGameByID, getGamesByUser};
