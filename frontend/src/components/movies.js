import React, { useState,useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/movieCard";
import MoviesDataService from "../services/dataService";
import { UserContext } from "../context/UserContext";

const Movies = props => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [searchName, setSearchName ] = useState("");

  useEffect(()=>{
      console.log(userContext);
    }, []);


  const onChangeSearchName = e => {
      const searchName = e.target.value;
      setSearchName(searchName);
  };

  const retrieveMovies = (searchName) => {
      console.log(searchName);
      MoviesDataService.getMovies(searchName)
      .then(response => {
        console.log(response.data.data.results);
        setMovies(response.data.data.results); //Gonna have to change this to match data received
        console.log(movies);
      })
    };


  return (
    <div className="container pr-5 pl-5">
      <h1 className="text-center">Search for Movies</h1>
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
              onClick={() => retrieveMovies(searchName)}
              //Need to add on click event and state event here
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row pt-3 pb-3 justify-content-center">
          {
            movies.map(currentMovie => {
              var movieImage = currentMovie.poster_path ? "https://image.tmdb.org/t/p/w185/" + currentMovie.poster_path : "./NoMovieImage.jpg"
              var movieAlreadyAdded = true;
              //Determine if movie is already added
              console.log("Favorite Movies");
              console.log(userContext.details);
              if(Object.entries(userContext.details.favorite_movies) < 1){
                movieAlreadyAdded = false;
              }
              else{
                movieAlreadyAdded = false;
                //movieAlreadyAdded = Array.from(Object.entriuserContext.details.favorite_movies).includes(currentMovie)
              }

              return(
                <MovieCard movie={{currentMovie,"image":movieImage,"movieAlreadyAdded":movieAlreadyAdded}}/>
              )
            })
          }
      </div>
    </div>
  );
};

//{movies.map((movies) =>{
//<MovieCard movie={{"name":"Mean Girls","description":"Girls are mean. I don't know what you expected.","image":"https://image.tmdb.org/t/p/w185/fXm3YKXAEjx7d2tIWDg9TfRZtsU.jpg"}}/>
//<MovieCard movie={{"name":"Toy Story","description":"Toys do some crazy shit on this wild ass adventure. Be prepared to be scared because the neighbor kid is batshit, and you'll think your own toys may come to life to kill you one day. Pick up your phobia of dolls and toys with eyes now!!!","image":"https://image.tmdb.org/t/p/w185/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg"}}/>
//<MovieCard movie={{"name":"Mean Girls","description":"Girls are mean. I don't know what you expected.","image":"https://image.tmdb.org/t/p/w185/xj3jhyq3ZsfdVn79kXC1XKFVQlv.jpg"}}/>
//}};
export default Movies;
