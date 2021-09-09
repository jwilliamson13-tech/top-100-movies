import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../components/login";
import Logout from "../components/logout";

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">Top 100 Movies</a>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
            <a className="nav-link" href="/movies">Movies</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/profiles">Profiles</a>
        </li>
        <li className="nav-item">
          <Login/>
        </li>
        <li className="nav-item">
          <Logout/>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
