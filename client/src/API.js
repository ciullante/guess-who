const APIURL = "http://localhost:3000/api";

/*************************||*************************/

async function getGuess() {
  try {
    const response = await fetch(APIURL + "/guess");
    if (response.ok) {
      const n = await response.text();
      return Number(n);
    } else throw new Error("CAVOLETTI!");
  } catch (e) {
    throw new Error(e);
  }
}

/*************************|do Login function|*************************/

async function doLogin(username, password) {
  try {
    const response = await fetch(APIURL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      const message = await response.text();
      throw new Error(response.statusText);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

/*************************|check login|*************************/

async function isLogged() {
  try {
    const response = await fetch(APIURL + "/login", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      const message = await response.text();
      throw new Error(response.statusText + " " + message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

/*************************|do logout|*************************/

async function doLogout() {
  try {
    const response = await fetch(APIURL + "/logout", {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      return true;
    } else {
      const message = await response.text();
      throw new Error(response.statusText + " " + message);
    }
  } catch (error) {
    throw new Error(error.message, { cause: error });
  }
}

/*************************|startGame|*************************/
async function startGame(difficult) {
  try {
    const response = await fetch(APIURL + `/games/startgame`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        difficult: difficult
      }),
    });
    if (response.ok) {
      const match = await response.json();
      return match;
    } else {
      const message = await response.text();
      throw new Error(response.statusText + " " + message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

/*************************|checkProperties|*************************/

async function checkProperty(gameid, property, value) {
  try {
    const response = await fetch(APIURL + `/games/${gameid}/checkproperties`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property: property,
        value: value,
      }),
    });
    if (response.ok) {
      const body = await response.json();
      return body.check;
    } else {
      const message = await response.text();
      throw new Error(response.statusText + " " + message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

/*************************|checkGuess|*************************/

async function checkGuess(gameid, guess) {
  try {
    const response = await fetch(APIURL + `/games/${gameid}/checkguess`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guess: guess.name,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const message = await response.text();
      throw new Error(response.statusText + " " + message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

/*************************|getGameHistory|*************************/

async function getGameHistory() {
  try {
    const response = await fetch(APIURL + `/games`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const history = await response.json();
      return history;
    } else {
      const message = await response.text();
      throw new Error(response.statusText + " " + message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export {
  getGuess,
  doLogin,
  doLogout,
  isLogged,
  startGame,
  checkProperty,
  checkGuess,
  getGameHistory,
};
