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

router.get('/:id', async (req,res) => {

  //Check if user doing this is the one searching
  const userId = req.params.id;

  const user = await userDAO.getUser(userId);
  res.send(user);
});

//Get a public user profile, only sending public info (name, movies, following)

//Delete User (add authentication after testing)
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

//Add movies to user
router.post('/movies', jsonParser, async (req,res) =>{
  //Check if user doing this is the one searching
  console.log(req.body);
  //Get user ID
  const userId = req.body.user;
  //Get movies (ObjectId)
  const movies = req.body.movies;

  const updated = await userDAO.addMovies(userId,movies);

  if(updated){
    res.send({"status":"success"});
  }
  else{
    res.status(500).send({"error":"Error adding movies to favorite movies list"});
  }

});

//Remove movies from user

//Add following to user

//Removing following from user

module.exports = router;
