import React, { useState } from "react";
import { Link } from "react-router-dom";

const MovieCard = props => {
  return (
    <div className="card border embbed-responsive" style={{width: "18rem"}}>

      <div className="card-body">
        <img className="card-img" src={props.movie.image}/>
        <h5 className="card-title">{props.movie.name}</h5>
        <p className="card-text">{props.movie.description}</p>
        <div className="row">
          <div className="col-sm-7">
            <button className="btn btn-outline-secondary" type="button">Add Movie</button>
          </div>
          <div className="col-sm-5">
            <button className="btn btn-outline-secondary" type="button">Delete Movie</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
