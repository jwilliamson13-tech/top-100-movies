import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Login from "../components/login";
import Logout from "../components/logout";
import { UserContext } from "../context/UserContext";

const Navbar = props => {

  const [userContext, setUserContext] = useContext(UserContext);


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="">Top 100 Movies</Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profiles">Profiles</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">Profile</Link>
        </li>
        {
          userContext.token != undefined && userContext.token != null ?
          <li className="nav-item">
            <Link className="nav-link" to="/logout">Logout</Link>
          </li>
          :
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>

          }
        }
      </ul>
    </nav>
  );
};

export default Navbar;
