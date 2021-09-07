const util = require('util');
const circularJSON = require('circular-json');
const { requiresAuth } = require('express-openid-connect');
const express = require('express');
const router = express.Router();
const userDAO = require("../dao/userDAO.js");
const User = require("../models/User");
const bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', async (req,res) =>{
  const users = await userDAO.getAllUsers();
  console.log(users);
  res.send(users);
});

//Returning Auth
router.get('/profile', (req, res) => {
  console.log("OIDC", req.oidc);
  //Prepare an authentication object for the frontend
  var auth = {};
  auth.auth = req.oidc.isAuthenticated();

  auth.profile = req.oidc.user;

  console.log(auth);
  res.send(auth);
});

//Add Auth after front end exists
router.get('/:id', async (req,res) => {

  //Check if user doing this is the one searching
  const userId = req.params.id;

  const user = await userDAO.getUser(userId);
  res.send(user);

  //Get a public user profile, only sending public info (name, movies, following) uf not auth
});



//Delete User | Add Auth after front end exists
router.delete('/:id', async (req,res) =>{
  //Check if user doing this is the one searching
  const userId = req.params.id;

  const deleted = userDAO.deleteUser(userId);
  if(deleted){
    res.json({"status": "success"});
  }
  else{
    res.status(500).send({"error":"Error deleting user"});
  }
});

//Add movies to user | Add Auth after front end exists
router.post('/movies', jsonParser, async (req,res) =>{
  //Check if user doing this is the one searching

  //Get user ID
  const userId = req.body.user;
  //Get movies (ObjectId)
  const movies = req.body.movies;

  console.log(req.oidc.user);
  if(req.oidc.user == userId){
    console.log("EQUALS");
  }

  const updated = await userDAO.addMovies(userId,movies);

  console.log(updated);
  if(updated){
    res.send({"status":"success"});
  }
  else{
    res.status(500).send({"error":"Error adding movies to favorite movies list"});
  }

});

//Remove movie from user | Add Auth after front end exists
router.delete('/movies/:user', jsonParser, async (req,res) =>{
  //Check if user doing this is the one searching
  console.log(req);
  //Get user ID
  const userId = req.params.user;
  //Get movies (ObjectId)
  const movie = req.body.movie;

  const updated = await userDAO.deleteMovie(userId,movie);

  console.log(updated);
  if(updated){
    res.send({"status":"success"});
  }
  else{
    res.status(500).send({"error":"Error deleting following"});
  }

});

//Add following to user | Add Auth after front end exists
router.post('/following', jsonParser, async (req,res) =>{
  //Check if user doing this is the one searching

  //Get user ID
  const userId = req.body.user;
  //Get movies (ObjectId)
  const following = req.body.following;

  const updated = await userDAO.addFollowing(userId,following);

  console.log(updated);
  if(updated){
    res.send({"status":"success"});
  }
  else{
    res.status(500).send({"error":"Error adding following"});
  }

});

//Removing following from user | Add Auth after front end exists
router.delete('/following/:user', jsonParser, async (req,res) =>{
  //Check if user doing this is the one searching

  //Get user ID
  const userId = req.params.user;
  //Get movies (ObjectId)
  const following = req.body.following;

  const updated = await userDAO.deleteFollowing(userId,following);

  console.log(updated);
  if(updated){
    res.send({"status":"success"});
  }
  else{
    res.status(500).send({"error":"Error deleting following"});
  }

});


module.exports = router;
