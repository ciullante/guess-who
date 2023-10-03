"use strict";
const yup = require("yup");
const validateObject = async (yupSchema, objectToBeValidated) => {
	let validatedObject = {};
	let validationError = undefined;
	let isValidationOk = true;

	try {
		validatedObject = await yupSchema.validate(objectToBeValidated);
	} catch (e) {
		validationError = e.errors[0];
		isValidationOk = false;
	}

	return {
		validatedObject,
		isValidationOk,
		validationError,
	};
};



function validateGame(game, user) {
	let isValid = true;
	let errorMessage = "";
	let status = null;
	if (game.status === "concluded") {
	  isValid = false;
	  errorMessage = "Game is concluded";
	  status = 400;
	} else if (game.playerID && (!user || game.playerID !== user.id)) {
	  isValid = false;
	  errorMessage = "Unauthorized";
	  status = 401;
	}
  
	return { isValid, errorMessage, status };
  }

module.exports = {validateObject, validateGame}