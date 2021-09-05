import React, { useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./movieCard"

const Profile = props => {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.baytekent.com%2Fwp-content%2Fuploads%2F2016%2F12%2Ffacebook-default-no-profile-pic1.jpg&f=1&nofb=1"/>
            <button className="btn btn-primary text-center" type="button">Follow</button>
          </div>
        </div>
        <div className="col-lg-4 align-self-top">
          <h3 className="text-center">TEST NAME</h3>
          <h4 className="text-center">Last Login: Yesterday</h4>
        </div>
        <div className="col-lg-4 align-self-center">
          <h3 className="text-center">FAVORITE MOVIE</h3>
          <MovieCard movie={{"name":"Toy Story","description":"Girls are mean. I don't know what you expected","image":"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.3hjDZEpqqvZeK_oVfbkh-gHaMx%26pid%3DApi&f=1"}}/>
        </div>
      </div>
      <div className="row">
        <h3 className="text-center">Top 100 Movies</h3>
        <div className="card-group pt-3 pb-3">
          <MovieCard movie={{"name":"Mean Girls","description":"Girls are mean. I don't know what you expected.","image":"https://image.tmdb.org/t/p/w185/fXm3YKXAEjx7d2tIWDg9TfRZtsU.jpg"}}/>
          <MovieCard movie={{"name":"Toy Story","description":"Toys do some crazy shit on this wild ass adventure. Be prepared to be scared because the neighbor kid is batshit, and you'll think your own toys may come to life to kill you one day. Pick up your phobia of dolls and toys with eyes now!!!","image":"https://image.tmdb.org/t/p/w185/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg"}}/>
          <MovieCard movie={{"name":"Mean Girls","description":"Girls are mean. I don't know what you expected.","image":"https://image.tmdb.org/t/p/w185/xj3jhyq3ZsfdVn79kXC1XKFVQlv.jpg"}}/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
