import React, { useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import MovieCard from "../components/movieCard";


const Dashboard = props => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [followingMovies, setFollowingMovies] = useState([]);

  const bgImageStyle = {
    backgroundImage: 'url(\'\https://images.unsplash.com/photo-1592780828756-c418d71faa1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80\')',
    height: "40vh"
  }

  function movieInUserFavorites(movieId){
    var favoriteMovies = Object.entries(userContext.details.favorite_movies);
    for(var i = 0; i < favoriteMovies.length; i++){
      if(favoriteMovies[i][1].id == movieId){
        return true;
      }
    }
    return false;
  }


  function showFollowerMovies(){
    var followsMovies = [];
    if(userContext.details != null){
      //Get followers
      var follows = userContext.details.following;

      //Loop through followers and get data
      for(var i = 0; i < follows.length; i++){
        //Look at top 3 movies from followers
        fetch(process.env.REACT_APP_API_ENDPOINT +"users/"+follows[i], {
          method:"GET",
          credentials:"include",
          headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${userContext.token}`
          }
        })
        .then(async response =>{
          if(response.ok){
            const data = await response.json();
            if(Object.entries(data.favorite_movies).length > 0){
              var movieRanks = Object.keys(data.favorite_movies).sort();

              for(var i = 0; i < Math.min(movieRanks.length,3); i++){
                var currentMovie = data.favorite_movies[movieRanks[i]];
                //Make a movie card for each and push
                var movieImage = currentMovie.poster_path ? "https://image.tmdb.org/t/p/w185/" + currentMovie.poster_path : "./NoMovieImage.jpg"

                followsMovies.push(<MovieCard movie={{currentMovie,"image":movieImage,"movieAlreadyAdded":movieInUserFavorites(currentMovie.id)}}/>);
              }
            }

          }
          else{
            if(response.status === 401){
              console.log("COULDNT FETCH PROFILE DETAILS");
              //window.location.reload()
            }
          }
        })
      }
      console.log("FOLLOWS MOVIES");
      console.log(followsMovies);
      return(followsMovies);
    }
  }




  return (
    <div className="contianer-fluid rounded">
      <div className="container  bg-image pt-5" style={bgImageStyle}>
        <h1 className=" text-light rounded">Welcome to Top 100 Movies</h1>
        <h3 className="text-light pb-5 pt-3">This is a place where you can rank your top 100 movies.</h3>
      </div>
      {
        userContext.details == null ? (

            <div className="row mt-5 mb-3 rounded justify-content-center align-items-center">
              <div className="col-md-6 text-center">
                <p>Already have an account?</p>
                <Link className="btn btn-primary" to="/login">Login</Link>
              </div>
              <div className="col-md-6 text-center">
                <p>New here?</p>
                <Link className="btn btn-primary" to="/register">Register</Link>
              </div>
            </div>
        )
        :
        (
          <div className="row">
          <p>test</p>
          {
            console.log(showFollowerMovies())
          }
          </div>
        )
      }
      </div>
  )
};

export default Dashboard;
