const util = require('util');
const circularJSON = require('circular-json');
const { requiresAuth } = require('express-openid-connect');
const express = require('express');
const router = express.Router();
const tmdbDAO = require("../dao/tmdbDAO.js");


//Get movies based on search query
router.get('/movies', async (req,res) => {
  //Pull this out and do checks on query
  var query = req.query;

  //Respond back if name does not exist

  const page = req.query.page ? req.query.page : 1;

  const name = req.query.name ? req.query.name : false;

  if(!name){
    res.send({"error":"No Movie name selected."});
  }
  else{
    try{
      //Get the movies from the DAO
      var movies = await tmdbDAO.getMovies(name,page);
      console.log(movies);

      //Check if pages exceed the maximum
      if(page > movies.data.total_pages){
        movies = await tmdbDAO.getMovies(name,1);
      }

      res.send(circularJSON.stringify(movies));
    } catch(e){
      console.error("Could not get movies from TMDBDAO: ", e);
    }
  }
});

router.get('/',async (req,res) =>{
  console.log(req.oidc);
});
module.exports = router;
