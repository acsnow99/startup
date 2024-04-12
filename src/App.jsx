import './style.css'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from "./Login";
import { Play } from "./Play";
import "./bootstrap/css/bootstrap.min.css";


function App() {

  return (
    <BrowserRouter>
      <header>
        <nav className="navbar navbar-expand navbar-dark">
          <a className="navbar-brand" href="index.html">Cool CS RPG - </a>
          <ul className="navbar-nav navbar-right">
            <li className="nav-item">
              <a className="nav-link" to="play">Play</a>
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
      </Routes>

      <footer>
        <p>by Alex Snow - <a href="https://github.com/acsnow99/startup">GitHub</a></p>
      </footer>
    </BrowserRouter>
  )
}

export default App
