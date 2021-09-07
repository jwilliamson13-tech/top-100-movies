import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import DataService from "../services/dataService";
import ProfileCard from "./profileCard"

const Profiles = props => {

  const [profiles, setProfiles] = useState([]);
  const [searchName, setSearchName ] = useState("");

  useEffect(()=>{
      retrieveUsers();
    }, []);

  const onChangeSearchName = e => {
      const searchName = e.target.value;
      setSearchName(searchName);
  };

  const retrieveUsers = () => {
      DataService.getUsers()
      .then(response => {
        console.log(response.data);
        setProfiles(response); //Gonna have to change this to match data received
      })
    };

  const retrieveUser = (searchName) => {
      console.log(searchName);
      DataService.getUser(searchName)
      .then(response => {
        console.log(response.data.data);
        setProfiles(response); //Gonna have to change this to match data received
      })
    };

  return (
    <div className="container pr-5 pl-5">
      <h1 className="text-center">Search for Profiles</h1>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => retrieveUser(searchName)}
              //Need to add on click event and state event here
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row pt-3 pb-3 justify-content-center">
      

      </div>
    </div>
  );
};


/*
{
  movies.map(currentMovie => {
    var movieImage = currentMovie.poster_path ? "https://image.tmdb.org/t/p/w185/" + currentMovie.poster_path : "./NoMovieImage.jpg"
    return(
      <MovieCard movie={{"name":currentMovie.original_title, "description":currentMovie.overview, "image":movieImage}}/>
    )
  })
}
*/
//{movies.map((movies) =>{
//<MovieCard movie={{"name":"Mean Girls","description":"Girls are mean. I don't know what you expected.","image":"https://image.tmdb.org/t/p/w185/fXm3YKXAEjx7d2tIWDg9TfRZtsU.jpg"}}/>
//<MovieCard movie={{"name":"Toy Story","description":"Toys do some crazy shit on this wild ass adventure. Be prepared to be scared because the neighbor kid is batshit, and you'll think your own toys may come to life to kill you one day. Pick up your phobia of dolls and toys with eyes now!!!","image":"https://image.tmdb.org/t/p/w185/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg"}}/>
//<MovieCard movie={{"name":"Mean Girls","description":"Girls are mean. I don't know what you expected.","image":"https://image.tmdb.org/t/p/w185/xj3jhyq3ZsfdVn79kXC1XKFVQlv.jpg"}}/>
//}};

export default Profiles;
