import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = props => {

  const { user, isAuthenticated, isLoading } = useAuth0();

  if(isLoading){
    return(<div>LOADING ...</div>)
  }

  return (
    isAuthenticated && (
      <div>
        <h1>DASHBOARD GOES HERE</h1>
        <img src={user.picture}/>
      </div>
    )
  );
};

export default Dashboard;
