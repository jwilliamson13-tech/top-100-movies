import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import AuthDataService from "../services/authService";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../context/UserContext";



const Register = () => {
  const[isSubmitting, setIsSubmitting] = useState(false);
  const[error,setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);


  const formSubmitHandler = e => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const errorMessage = "Something went wrong! Please try again later.";

    fetch("http://localhost:3000/users/register", {
      method: "POST",
      credentials: "include",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({email:email,password:password,password2:password2})
    })
    .then(async response => {
      if(!response.ok){
        if(response.status === 400){
          setError("Please fill all the fields correctly!");
        }
        else if(response.status === 401) {
          setError("Invalid email and password combination.");
        }
        else if(response.status === 500){
          console.error("Error registering user: ", response);
          const data = await response.json();
          if(data.message) {
            setError(data.message || errorMessage);
          }
        }
        else{
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
    .catch(e => {
      setIsSubmitting(false);
      setError(errorMessage);
    })
  }

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
        <button class="btn-primary" type="submit" disabled={isSubmitting}>{`${isSubmitting ? "Registering" : "Register"}`}</button>
      </form>
    </div>
  )

};

export default Register;
