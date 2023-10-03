"use strict";

async function checkLogin(req, res) {
  try {
    if (req.isAuthenticated()) return res.status(200).json(req.user);
    else return res.status(401).send("Not authenticated");
  } catch (error) {
    res.status(500).send(error.message);
  }
 
}

async function answerLogin(req, res) {
  res.status(200).json(req.user);
}

async function doLogout(req, res) {
  try {
    req.logOut((err) => {
      if (err) throw new Error("Error: logout");
      else res.status(200).json({});
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { checkLogin, answerLogin, doLogout };
