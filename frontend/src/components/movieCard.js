import React, { useState, useContext, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const MovieCard = props => {

  const history = useHistory();

  const[rank,setRank] = useState();
  const [userContext, setUserContext] = useContext(UserContext);
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("");
  var errorMessage = "Error with movies. Please try again later.";

  useEffect(()=>{
      //Set the state of the button based on movie added or not
      console.log(props.movie.movieAlreadyAdded);
      if(props.movie.movieAlreadyAdded){
        setButtonText("Delete Movie");
      }
      else{
        setButtonText("Add Movie");
      }
    }, []);



  function isNumeric(str) {
    if (typeof str != "string"){
      return false
    }
    return !isNaN(str) && !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  };

  const onChangeRank = e => {
      var newRank = e.target.value;
      console.log(newRank);
      if((newRank > 100 || newRank < 1) && newRank){
        newRank = "";
      }
      if(!isNumeric(rank) && rank){
        newRank = "";
      }
      console.log(typeof(newRank));
      console.log(newRank);
      setRank(newRank);
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
            setRank("");
            setButtonText("Delete Movie");
          }
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

  function buttonController(){
    if(buttonText == "Add Movie"){
      addMovie();
    }
    if(buttonText == "Delete Movie"){
      deleteMovie();
    }
  }

  return (
    <div className="card border embbed-responsive" style={{width: "18rem"}}>
      <div className="card-body">
        <img className="card-img" src={props.movie.image}/>
        <h5 className="card-title">{props.movie.currentMovie.original_title}</h5>
        <p className="card-text">{props.movie.currentMovie.overview}</p>
        <div className="row">
        <div className="col-sm-5">
          <input type="text" className="form-control" placeholder="Rank" value={rank} onChange={onChangeRank}></input>
        </div>
        <div className="col-sm-7">
          <button className="btn btn-outline-secondary" type="button" onClick={buttonController}>{buttonText}</button>
        </div>

        {
          props.movie.currentMovie.movieAlreadyAdded == true ? (<button className="btn btn-outline-secondary" type="button" onClick={deleteMovie}>Delete Movie</button>) : <div></div>
        }
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
