import React from "react";
import { Play } from "./Play";
import "./bootstrap/css/bootstrap.min.css";

function App() {
    return (
    <App>
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
      <main>
        <Routes>
          <Route
            path='/'
            element={<Login exact/>} />
          <Route path='/play' element={<Play />} />
          <Route path='/rules' element={<Rules />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </App>);
}

