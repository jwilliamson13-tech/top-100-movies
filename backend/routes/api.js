const util = require('util');
const circularJSON = require('circular-json');
const { requiresAuth } = require('express-openid-connect');
const express = require('express');
const router = express.Router();
const tmdbDAO = require("../dao/tmdbDAO.js");
const bodyParser = require('body-parser');
const { getToken, COOKIE_OPTIONS, getRefreshToken,verifyUser } = require("../authenticate")
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

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

router.post('/movies', jsonParser, async (req,res) => {
  var {id, movie, rank} = req.body;

  //Add checks for authentication and user id = id



  if(rank !== undefined && rank <= 100 && rank >= 1){
    //Get user's favorite movies
    User.findOne({"_id":id}, async (err, user) => {
      if(err){
        console.error("Error finding user: ", err);
        res.status(500);
        res.send({success: false, error: "User not found."});
      }
      else{
        console.log(user.favorite_movies);
        var favorite_movies = user.favorite_movies;

        var currentPosition = rank;
        var done = false;
        var toBePlaced = movie;
        var buffer;


        while(currentPosition <= 100 && !done) {
          //If our named rank doesn't exist, we're good to go
          if(!favorite_movies.has(currentPosition.toString())) {
            favorite_movies.set(currentPosition.toString(),toBePlaced);
            done = true;
          }
          else {
            //Shift everything up one until we hit something that's empty
            buffer = favorite_movies.get(currentPosition.toString());
            favorite_movies.set(currentPosition.toString(),toBePlaced);
            currentPosition++;
            if(buffer === undefined){
              done = true;
            }
            else{
              toBePlaced = buffer;
            }
          }
        }
        console.log(favorite_movies);

        //Update user
        const updatedUser = await User.findOneAndUpdate({"_id":id},{'$set': {"favorite_movies":favorite_movies}},{'new':true});

        //Check to see if new movie was added (this helps return errors)
        if(updatedUser.favorite_movies.get(rank).id === movie.id){
          res.send({success:true});
        }
        else{
          res.send({success:false, error: "Error updating movie list"});
        }
      }
    })
  }
  else {
    res.send({success: false, error: "Rank is an incorrect value."})
  }
});

module.exports = router;
