import React, { useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/movieCard"

const Movies = props => {
  return (
    <div className="container pr-5 pl-5">
      <h1 className="text-center">MOVIES GO HERE</h1>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              //Need to add on click event and state event here
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="card-group pt-3 pb-3">
          <MovieCard movie={{"name":"Toy Story","description":"Toys do some crazy shit on this wild ass adventure. Be prepared to be scared because the neighbor kid is batshit, and you'll think your own toys may come to life to kill you one day. Pick up your phobia of dolls and toys with eyes now!!!","image":"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.3hjDZEpqqvZeK_oVfbkh-gHaMx%26pid%3DApi&f=1"}}/>
          <MovieCard movie={{"name":"Mean Girls","description":"Girls are mean. I don't know what you expected.","image":"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmovieposters2.com%2Fimages%2F655616-b.jpg&f=1&nofb=1"}}/>
          <MovieCard movie={{"name":"Toy Story","description":"Toys do some crazy shit on this wild ass adventure. Be prepared to be scared because the neighbor kid is batshit, and you'll think your own toys may come to life to kill you one day. Pick up your phobia of dolls and toys with eyes now!!!","image":"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.3hjDZEpqqvZeK_oVfbkh-gHaMx%26pid%3DApi&f=1"}}/>
          <MovieCard movie={{"name":"Toy Story","description":"Toys do some crazy shit on this wild ass adventure. Be prepared to be scared because the neighbor kid is batshit, and you'll think your own toys may come to life to kill you one day. Pick up your phobia of dolls and toys with eyes now!!!","image":"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.3hjDZEpqqvZeK_oVfbkh-gHaMx%26pid%3DApi&f=1"}}/>
          <MovieCard movie={{"name":"Mean Girls","description":"Girls are mean. I don't know what you expected.","image":"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmovieposters2.com%2Fimages%2F655616-b.jpg&f=1&nofb=1"}}/>
          <MovieCard movie={{"name":"Mean Girls","description":"Girls are mean. I don't know what you expected.","image":"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmovieposters2.com%2Fimages%2F655616-b.jpg&f=1&nofb=1"}}/>
          <MovieCard movie={{"name":"Mean Girls","description":"Girls are mean. I don't know what you expected.","image":"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmovieposters2.com%2Fimages%2F655616-b.jpg&f=1&nofb=1"}}/>
          <MovieCard movie={{"name":"Mean Girls","description":"Girls are mean. I don't know what you expected.","image":"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmovieposters2.com%2Fimages%2F655616-b.jpg&f=1&nofb=1"}}/>
      </div>
    </div>
  );
};

export default Movies;
