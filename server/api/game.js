"use strict";

const itemsdao = require("../database/items-dao");
const gamesdao = require("../database/games-dao");
const propertiesdao = require("../database/properties-dao");
const { Game } = require("../models/models");
const dayjs = require("dayjs");
const yup = require("yup");
const { validateObject, validateGame } = require("../utils");

/*************************|START GAME (POST /api/:difficult/startGame)|*************************/

async function startGame(req, res) {
  try {
    const bodySchema = yup.object({
      difficult: yup.number().required().integer().min(1).max(3),
    });
    const {
      validatedObject: body,
      isValidationOk,
      validationError,
    } = await validateObject(bodySchema, req.body);
    if (!isValidationOk) res.status(400).send(validationError);

    const difficult = body.difficult;
    const user = req.user;

    const items = await itemsdao.getItemsByDifficult(difficult);
    const propertyNames = (await propertiesdao.getProperties()).map(
      (p) => p.name
    );
    const secretItem = items[Math.floor(Math.random() * difficult * 12)];
    const gameID = await gamesdao.createNewGame(
      new Game(
        null,
        dayjs().format("YYYY-MM-DD"),
        difficult,
        secretItem.name,
        difficult * 12,
        req.isAuthenticated() ? user.id : null,
        "playing"
      )
    );
    console.log(items.filter((i) => i.id === secretItem.id)[0]);
    res.status(200).json({ gameID, items, propertyNames });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

/*************************|(PUT /api/games/:gameid/checkProperty)|*************************/

async function checkProperty(req, res) {
  try {
    const paramsSchema = yup.object({
      gameid: yup.number().required().integer().positive(),
    });
    const bodySchema = yup
      .object({
        property: yup.string().required(),
        value: yup.string().required(),
      })
      .test(
        "isValidProperty",
        "The property is not valid",
        async ({ property, value }) => {
          try {
            const prop = await propertiesdao.getPropertyByName(property);
            return prop.values.includes(value);
          } catch (error) {
            return false;
          }
        }
      );

    const {
      validatedObject: params,
      isValidationOk: isParamsOk,
      validationError: paramsError,
    } = await validateObject(paramsSchema, req.params);

    const {
      validatedObject: body,
      isValidationOk: isBodyOk,
      validationError: bodyError,
    } = await validateObject(bodySchema, req.body);

    if (!isParamsOk) return res.status(400).send(paramsError);
    if (!isBodyOk) return res.status(400).send(bodyError);

    const gameID = params.gameid;
    const user = req.user;
    const { property, value } = body;

    const game = await gamesdao.getGameByID(gameID);

    const { isValid, errorMessage, status } = validateGame(game, user);
    if (!isValid) return res.status(status).send(errorMessage);

    const item = await itemsdao.getItemByName(game.secret);
    await gamesdao.updateGame(
      new Game(
        game.id,
        game.date,
        game.difficult,
        game.secret,
        game.score - 1,
        game.playerID,
        game.status
      )
    );
    if (item[property] === value) return res.status(200).json({ check: true });
    else return res.status(200).json({ check: false });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

/*************************|(PUT /api/games/:gameid/checkguess)|*************************/

async function checkGuess(req, res) {
  try {
    const paramsSchema = yup.object({
      gameid: yup.number().required().integer().positive(),
    });
    const bodySchema = yup.object({
      guess: yup.string().required(),
    });

    const {
      validatedObject: params,
      isValidationOk: isParamsOk,
      validationError: paramsError,
    } = await validateObject(paramsSchema, req.params);

    const {
      validatedObject: body,
      isValidationOk: isBodyOk,
      validationError: bodyError,
    } = await validateObject(bodySchema, req.body);

    if (!isParamsOk) return res.status(400).send(paramsError);
    if (!isBodyOk) return res.status(400).send(bodyError);

    const gameID = params.gameid;
    const user = req.user;
    const { guess } = body;
    const result = {};

    const game = await gamesdao.getGameByID(gameID);

    const { isValid, errorMessage, status } = validateGame(game, user);
    if (!isValid) return res.status(status).send(errorMessage);

    const item = await itemsdao.getItemByName(game.secret);

    result.secretItem = item;
    if (game.secret === guess) {
      result.score = game.score;
      result.check = true;
    } else {
      game.score = 0;
      result.score = 0;
      result.check = false;
    }

    if (user)
      await gamesdao.updateGame(
        new Game(
          game.id,
          game.date,
          game.difficult,
          game.secret,
          game.score,
          game.playerID,
          "concluded"
        )
      );
    else await gamesdao.deleteGameByID(game.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

/*************************|(get /api/properties)|*************************/
async function getHistory(req, res) {
  try {
    const user = req.user;

    const history = await gamesdao.getGamesByUser(user);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  startGame,
  checkProperty,
  checkGuess,
  getHistory,
};
