"use strict";

const PORT = 3000;

//import DAO and Data models
const userdao = require("./database/user-dao");

//import functions
const authentication = require("./api/auth");
const game = require("./api/game");

// middleware modules
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");

//PASSPORT
const passport = require("passport");
const LocalStrategy = require("passport-local");

// CREATE APP
const app = express();

//configure and register middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: "alessandro-ciullo",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static('public'));

/*************************|PASSPORT|*************************/
// Configure and register Passport
passport.use(new LocalStrategy((username, password, callback) => {
  // verify function
  userdao.getUser(username, password).then((user) => {
      callback(null, {id: user.id, email: user.email, name : user.name});
  }).catch((err) => {
      callback(null, false, err)
  });
}));

// serialize and de-serialize the user (user object <-> session)
passport.serializeUser((user, callback) => {
  return callback(null, user);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((user, callback) => {
  return callback(null, user);
});


app.use(passport.initialize());
app.use(passport.authenticate('session'));

// Custom middleware: check login status
const isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send("");
    }
}

// Custom middleware: artificial delay
// function delay(req, res, next) {
//   setTimeout(() => { next() }, 500);
// }

// app.use(delay);
/*************************|APIs|*************************/

app.get("/guess",isLogged, (req, res) => {
  const n = Math.floor(Math.random() * 100);
  res.send(String(n));
});

app.post('/api/login', passport.authenticate('local'), authentication.answerLogin);

app.get('/api/login', authentication.checkLogin);

app.delete('/api/logout', authentication.doLogout);

app.post('/api/games/startgame', game.startGame);

app.post('/api/games/:gameid/checkproperties', game.checkProperty);

app.put('/api/games/:gameid/checkguess', game.checkGuess);

app.get('/api/games', isLogged, game.getHistory)

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/`);
});
