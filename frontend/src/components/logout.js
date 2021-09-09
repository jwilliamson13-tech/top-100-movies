import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import AuthDataService from "../services/authService";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {

  const { logout } = useAuth0();

  return(
    <a className="nav-link" href="#" onClick={() => logout({ returnTo: window.location.origin })}>Log Out</a>
  )

};

export default Logout;
