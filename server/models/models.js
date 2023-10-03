"use strict";

const dayjs = require("dayjs");

class Item {
  constructor(id, name, path, color, nature, locomotion, origin, size) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.color = color;
    this.nature = nature;
    this.locomotion = locomotion;
    this.origin = origin;
    this.size = size;
  }
}

class Game {
  constructor(id, date, difficult, secret, score, playerID, status) {
    this.id = id;
    this.date = date;
    this.difficult = difficult;
    this.secret = secret;
    this.score = score;
    this.playerID = playerID;
    this.status = status;
  }
}

class User {
  constructor(id, email, name) {
    this.id = id;
    this.email = email;
    this.name = name;
  }
}

class Property {
  constructor(id, name, values) {
    this.id = id;
    this.name = name;
    this.values = values;
  }
}

module.exports = { Item, Game, User, Property};
