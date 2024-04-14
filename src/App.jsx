import './style.css'
import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from "./Login";
import { Register } from './Register';
import { Play } from "./Play";
import { Rules } from "./Rules";
import { NotFound } from "./NotFound";
import "./bootstrap/css/bootstrap.min.css";


function App() {
  const [authorized, setAuthorized] = React.useState(false);

  function logout() {
    console.log("Welp");
    localStorage.removeItem('username');
    setAuthorized(false);
  }

  return (
    <BrowserRouter>
      <header>
        <nav className="navbar navbar-expand navbar-dark">
          <NavLink className="navbar-brand" to="/">Cool CS Games - </NavLink>
          {authorized && (<ul className="navbar-nav navbar-right">
            <li className="nav-item">
              <NavLink className="nav-link" to="/play">Play</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/rules">Rules</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" onClick={() => logout()}>Logout</NavLink>
            </li>
          </ul>)}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Login auth={authorized} setAuth={setAuthorized} />} exact />
        <Route path="/register" element={<Register />} />
        <Route path="/play" element={<Play auth={authorized} />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer>
        <p>by Alex Snow - <a href="https://github.com/acsnow99/startup" target="_blank">GitHub</a></p>
      </footer>
    </BrowserRouter>
  )
}

export default App
