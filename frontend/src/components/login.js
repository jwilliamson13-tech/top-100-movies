import React, { useContext, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import AuthDataService from "../services/authService";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../context/UserContext";



const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSubmitHandler = e => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const errorMessage = "Something went wrong! Please try again later.";

    fetch("http://localhost:3000/users/login", {
      method: "POST",
      credentials: "include",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({email: email, password: password})
    })
    .then(async response => {
      setIsSubmitting(false);
      if(!response.ok){
        if(response.status === 400){
          setError("Please fill out all fields correctly.");
        }
        else if(response.status === 401){
          setError("Invalid email and password combination");
        }
        else {
          setError(errorMessage);
        }
      }

      else{
        const data = await response.json();
        setUserContext(oldUserValues => {
          return {...oldUserValues, token:data.token};
        });
      }
    })
    .catch(e =>{
      setIsSubmitting(false);
      setError(errorMessage);
    });
  }

  console.log(UserContext)
  return(
    <div className="container pr-5 pl-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="" onSubmit={formSubmitHandler}>
        <div className="form-group" label="Email" labelFor="email">
          <input
            id="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group" label="Password" labelFor="password">
          <input
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button
        className="btn-primary"
        type="submit"
        disabled={isSubmitting}
        >{`${isSubmitting ? "Signing In" : "Sign In"}`}</button>
      </form>
    </div>
  )

};

export default Login;
