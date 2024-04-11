import { useState } from 'react'
import './App.css'
import { Login } from "./Login";

function App() {

  return (
    <>
      <header>
        <nav class="navbar navbar-expand navbar-dark">
          <a class="navbar-brand" href="index.html">Cool CS RPG - </a>
          <ul class="navbar-nav navbar-right">
            <li class="nav-item">
              <a class="nav-link" href="play.html">Play</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="rules.html">Rules</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="index.html">Logout</a>
            </li>
          </ul>
        </nav>
      </header>

      <Login />

      <footer style="align-items: start">
        <p>by Alex Snow - <a href="https://github.com/acsnow99/startup">GitHub</a></p>
      </footer>
    </>
  )
}

export default App
