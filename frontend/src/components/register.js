import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import AuthDataService from "../services/authService";
import { useAuth0 } from "@auth0/auth0-react";



const Register = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  return(
    <div className="container pr-5 pl-5">
      <form className="">
        <div className="form-group" label="Email" labelFor="email">
          <input
            id="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <br/>
        <div className="form-group" label="Password" labelFor="password">
          <input
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <br/>
        <div className="form-group" label="Password2" labelFor="password2">
          <input
            id="password2"
            placeholder="Confirm Password"
            type="password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
        </div>
        <button class="btn-primary" type="submit">Register</button>
      </form>
    </div>
  )

};

export default Register;
