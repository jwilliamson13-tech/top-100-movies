import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import AuthDataService from "../services/authService";
import { useAuth0 } from "@auth0/auth0-react";



const Login = () => {

  const { loginWithRedirect } = useAuth0();

  return(
    <a className="nav-link" href="#" onClick={() => loginWithRedirect()}>Log In</a>
  )

};

export default Login;
