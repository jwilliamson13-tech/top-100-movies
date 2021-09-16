import React, { useState,useEffect, useContext, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import MovieCard from "../components/movieCard";
import DataService from "../services/userDataService";
import AuthService from "../services/authService";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../context/UserContext";

const Profile = props => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [movies, setMovies] = useState([]);

  const params = useParams();

  const userId = params.userId;

  var accessToken;

  return userContext.details == null ? (
    <div className="container mt-3">
      <div className="alert alert-danger">Error Finding User Details</div>
    </div>) :
    (
      <div className="container mt-3">
      {console.log(userContext.details)}
        <div className="row">
          <div className="col-lg-4">
            <h1>Email: {userContext.details.email}</h1>
            <h3>Movies Favorited: {userContext.details.favorite_movies.length}</h3>
            <button className="btn btn-primary text-center" type="button">Follow</button>
          </div>
          <div className="col-lg-8 align-self-center">
            <h3 className="text-center">Top 3 Movies</h3>
            <MovieCard movie={{"name":"Toy Story","description":"Girls are mean. I don't know what you expected","image":"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.3hjDZEpqqvZeK_oVfbkh-gHaMx%26pid%3DApi&f=1"}}/>
          </div>
        </div>
        <div className="row pt-3">
          <h3 className="text-center">Top 100 Movies</h3>
          <div className="row pt-3 pb-3 justify-content-center">

            <MovieCard movie={{"name":"Mean Girls","description":"Girls are mean. I don't know what you expected.","image":"https://image.tmdb.org/t/p/w185/fXm3YKXAEjx7d2tIWDg9TfRZtsU.jpg"}}/>
            <MovieCard movie={{"name":"Toy Story","description":"Toys do some crazy things on this wild adventure. Be prepared to be scared because the neighbor kid is crazy, and you'll think your own toys may come to life to kill you one day. Pick up your phobia of dolls and toys with eyes now!!!","image":"https://image.tmdb.org/t/p/w185/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg"}}/>
            <MovieCard movie={{"name":"Mean Girls","description":"Girls are mean. I don't know what you expected.","image":"https://image.tmdb.org/t/p/w185/xj3jhyq3ZsfdVn79kXC1XKFVQlv.jpg"}}/>
          </div>
        </div>
      </div>
    );
};

export default Profile;
