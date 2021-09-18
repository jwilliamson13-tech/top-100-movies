import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = props => {

  const bgImageStyle = {
    backgroundImage: 'url(\'\https://images.unsplash.com/photo-1592780828756-c418d71faa1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80\')',
    height: "40vh"
  }

  return (
    <div className="contianer-fluid rounded">
      <div className="container  bg-image pt-5" style={bgImageStyle}>
        <h1 className=" text-light rounded">Welcome to Top 100 Movies</h1>
        <h3 className="text-light pb-5 pt-3">This is a place where you can rank your top 100 movies.</h3>
      </div>
      <div className="row mt-5 mb-3 rounded justify-content-center align-items-center">
        <div className="col-md-4 text-center">
          <p>Want to search for some movies?</p>
          <Link className="btn btn-primary" to="/movies">Movies</Link>
        </div>
        <div className="col-md-4 text-center">
          <p>Already have an account?</p>
          <Link className="btn btn-primary" to="/login">Login</Link>
        </div>
        <div className="col-md-4 text-center">
          <p>New here?</p>
          <Link className="btn btn-primary" to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
