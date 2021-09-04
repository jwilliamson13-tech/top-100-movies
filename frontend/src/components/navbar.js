import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">Top 100 Movies</a>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
            <a className="nav-link" href="/movies">Movies</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/users">Profiles</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
