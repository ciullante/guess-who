"use strict";

const db = require("../database/db");
const crypto = require("crypto");
const { User } = require("../models/models");

function getUser(username, password) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email=?";
    db.get(sql, [username], (err, row) => {
      if (err) {
        // database error
        reject(err);
      } else {
        if (!row) {
          // non-existent user
          reject(new Error("Invalid username or password"));
        } else {
          crypto.scrypt(password, row.salt, 32, (err, computed_hash) => {
            if (err) {
              // key derivation fails
              reject(err);
            } else {
              const equal = crypto.timingSafeEqual(
                computed_hash,
                Buffer.from(row.password, "hex")
              );
              if (equal) {
                // password ok
                resolve(new User(row.id, row.email, row.name));
              } else {
                // password doesn't match
                reject(new Error("Invalid username or password"));
              }
            }
          });
        }
      }
    });
  });
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) resolve(new Error("Error: User not found"));
      else {
        // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
        const user = { id: row.id, username: row.email, name: row.name };
        resolve(user);
      }
    });
  });
}


module.exports = {getUser, getUserById};
