import './style.css'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from "./Login";
import { Play } from "./Play";
import { NotFound } from "./NotFound";
import "./bootstrap/css/bootstrap.min.css";


function App() {

  return (
    <BrowserRouter>
      <header>
        <nav className="navbar navbar-expand navbar-dark">
          <NavLink className="navbar-brand" to="/">Cool CS RPG - </NavLink>
          <ul className="navbar-nav navbar-right">
            <li className="nav-item">
              <NavLink className="nav-link" to="play">Play</NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="rules.html">Rules</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="index.html">Logout</a>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route 
          path="/play" element={<Play />} />
        <Route path="/" element={<Login />} exact />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer>
        <p>by Alex Snow - <a href="https://github.com/acsnow99/startup">GitHub</a></p>
      </footer>
    </BrowserRouter>
  )
}

export default App
