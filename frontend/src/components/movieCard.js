import React, { useState } from "react";
import { Link } from "react-router-dom";

const MovieCard = props => {
  return (
    <div class="card border embbed-responsive " style={{width: "18rem;"}}>

      <div class="card-body">
        <img class="card-img" src={props.movie.image}/>
        <h5 class="card-title">{props.movie.name}</h5>
        <p class="card-text">{props.movie.description}</p>
        <div className="row">
          <div className="col-sm-5">
            <button className="btn btn-outline-secondary" type="button">Add Movie</button>
          </div>
          <div className="col-sm-1"></div>
          <div className="col-sm-6">
            <button className="btn btn-outline-secondary" type="button">Delete Movie</button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default MovieCard;
