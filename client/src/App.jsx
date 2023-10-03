import { useState, useEffect } from "react";
import { doLogin, isLogged, doLogout } from "./API";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import UserContext from "./UserContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { LoginForm } from "./components/Login";
import { Lobby } from "./components/Lobby";
import { Game } from "./components/Game/Game";
import { MatchHistory } from "./components/MatchHistory";
import { MainLayout } from "./components/MainLayout";
import { ErrorMessage } from "./components/ErrorMessage";

const URL = "http://localhost:3000";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const check = async () => {
      try {
        const user = await isLogged();
        setUser(user);
      } catch (error) {}
    };
    check();
  }, []);

  const validateLogin = async (username, password) => {
    try {
      const user = await doLogin(username, password);
      setUser(user);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleLogout = async () => {
    await doLogout();
    setUser({});
  };

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout handleLogout={handleLogout} />}>
            <Route index element={<Lobby />} />
            <Route
              path="/login"
              element={<LoginForm validateLogin={validateLogin} />}
            />
            <Route path="/game/:difficult" element={<Game />} />
            <Route path="/gamehistory" element={<MatchHistory />} />
            <Route path="*" element={<ErrorMessage message="Page not found..." />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
