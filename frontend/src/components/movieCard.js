import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const MovieCard = props => {

  const[rank,setRank] = useState();
  const [userContext, setUserContext] = useContext(UserContext);
  const [error, setError] = useState("");
  var errorMessage = "Error with movies. Please try again later.";

  function isNumeric(str) {
    if (typeof str != "string"){
      return false
    }
    return !isNaN(str) && !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  };

  const onChangeRank = e => {
      var rank = e.target.value;
      console.log(rank);
      if((rank > 100 || rank < 1) && rank){
        rank = "";
      }
      if(!isNumeric(rank) && rank){
        rank = "";
      }
      console.log(typeof(rank));
      console.log(rank);
      setRank(rank);
  };

  function addMovie(){
    var errorMessage = "Error with movies. Please try again later.";
    console.log(rank <= 100 && rank >= 1  && rank && userContext.details._id);
    //Check if rank is within range and not null and user id
    if(rank <= 100 && rank >= 1 && rank && userContext.details._id){
      console.log("ABOUT TO FETCH");
      fetch(process.env.REACT_APP_API_ENDPOINT+ "api/v1/movies", {
        method: "POST",
        credentials: "include",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({id:userContext.details._id,movie:props.movie.currentMovie,rank:rank})
      })
      .then(async response => {
        if(!response.ok){
          if(response.status === 400){
            setError("Please fill out all fields correctly.");
          }
          else if(response.status === 401){
            setError("Not signed in. Please sign in to add movies.");
          }
          else {
            setError(errorMessage);
          }
        }
        else{
          const data = await response.json();
          if(data.success){
            rank = "";
          }
          //history.push("/movies");
          console.log(data);
        }
      })
      .catch(e =>{
        setError(errorMessage);
      })
    }
  }

  function deleteMovie(){
    console.log("DELETING");
  }


  return (
    <div className="card border embbed-responsive" style={{width: "18rem"}}>
      <div className="card-body">
        <img className="card-img" src={props.movie.image}/>
        <h5 className="card-title">{props.movie.currentMovie.original_title}</h5>
        <p className="card-text">{props.movie.currentMovie.overview}</p>
        <div className="row">
        {
          props.movie.currentMovie.movieAlreadyAdded == true ? (<button className="btn btn-outline-secondary" type="button" onClick={deleteMovie}>Delete Movie</button>) :
          (
            <div className="col-sm-5">
              <input type="text" className="form-control" placeholder="Rank" value={rank} onChange={onChangeRank}></input>
            </div>
          )
        }
        {props.movie.currentMovie.movieAlreadyAdded == true ? <div></div> :(
          <div className="col-sm-7">
            <button className="btn btn-outline-secondary" type="button" onClick={addMovie}>Add Movie</button>
          </div>
        )
        }
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
