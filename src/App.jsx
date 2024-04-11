import './style.css'
import { Login } from "./Login";
import "./bootstrap/css/bootstrap.min.css";


function App() {

  return (
    <>
      <header>
        <nav className="navbar navbar-expand navbar-dark">
          <a className="navbar-brand" href="index.html">Cool CS RPG - </a>
          <ul className="navbar-nav navbar-right">
            <li className="nav-item">
              <a className="nav-link" href="play.html">Play</a>
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

      <Login />

      <footer>
        <p>by Alex Snow - <a href="https://github.com/acsnow99/startup">GitHub</a></p>
      </footer>
    </>
  )
}

export default App
