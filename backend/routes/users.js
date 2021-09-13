const util = require('util');
const circularJSON = require('circular-json');
const { requiresAuth } = require('express-openid-connect');
const express = require('express');
const router = express.Router();
const userDAO = require("../dao/userDAO.js");
const User = require("../models/User");
const bodyParser = require('body-parser');
const { getToken, COOKIE_OPTIONS, getRefreshToken,verify } = require("../authenticate")
const passport = require("passport")

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/login", passport.authenticate("local"), jsonParser, (req,res) =>{
  console.log(req.body);
  const token = getToken({ _id: req.body.user._id })
  const refreshToken = getRefreshToken({ _id: req.body.user._id })
  User.findById(req.user._id).then(user => {
      user.refreshToken.push({ refreshToken });
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500
          res.send(err)
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
          res.send({ success: true, token })
        }
      });
    },
    err => next(err));
});

router.post("/refreshToken", (req,res,next) =>{
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies

  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      const userId = payload._id

      User.findOne({ _id: userId }).then(user => {
        if (user) {
          // Find the refresh token and compare it to the one in the user record in the database
          const tokenIndex = user.refreshToken.findIndex((item) => {
            item.refreshToken === refreshToken
          });

          if (tokenIndex === -1) {
            res.statusCode = 401;
            res.send("Unauthorized");
          } else {
            const token = getToken({ _id: userId });

            // If the refresh token exists, then create new one and replace it.
            const newRefreshToken = getRefreshToken({ _id: userId });
            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
            user.save((err, user) => {
              if (err) {
                res.statusCode = 500
                res.send(err)
              } else {
                res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                res.send({ success: true, token });
              }
            });
          }
        }
        //User wasn't found
        else {
          res.statusCode = 401
          res.send("Unauthorized")
        }
      },
      err => next(err)
      );
    }
    catch (err) {
      res.statusCode = 401
      res.send("Unauthorized")
    }
  }
  else {
    res.statusCode = 401
    res.send("Unauthorized")
  }
});

router.get("/user", verify, (req,res) =>{
  res.send(req.user);
});

router.get('/', async (req,res) =>{
  const users = await userDAO.getAllUsers();
  console.log(users);
  res.send(users);
});

router.post("/", jsonParser, async (req,res) => {

  var {email,password,password2} = req.body;
  try{
    if(!email){
      return {success: false, error: "No Email Given"}
    }

    if(password != password2){
      return {success: false, error: "Passwords do not match"}
    }

    //Check if user exists
    console.log("2");
    //If not, register

      try{
        console.log("3");
        User.register(new User({email: email}),password, async (err,newUser) => {
          console.log("4");
          if(err){
            console.log(err);
            return {success: false, error: "Failure generating user"}
          }
          else{
            console.log("5");
            //Get user token
            const token = getToken({ _id: newUser._id });
            const refreshToken = getRefreshToken({ _id: newUser._id });
            newUser.refreshToken.push({ refreshToken });
            var updatedUser = newUser.save((err,savedUser) =>{
              if(err){
                res.statusCode = 500;
                res.send(err);
              }
              console.log("6");
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
              //var thingToReturn = { success: true, token: token, refreshToken:refreshToken }
              //console.log("7");
              res.send({ success: true, token })
            })


            /*
            //Salt password
            bcrypt.genSalt(10, (err, salt) => {
              if(err){
                return {success: false, error: "Failure generating salt"}
              }
              else{
                bcrypt.hash(password, salt, async (err, hash) => {
                  if (err){
                    return {success: false, error: "Failure hashing password"}
                  }
                  newUser.password = hash;
                  await newUser.save()

                  var thingToReturn = { success: true, token: token, refreshToken:refreshToken }
                  console.log(thingToReturn)
                  return { success: true, token: token, refreshToken:refreshToken }
                });
              }
              });
              */

            }
          });
      }
      catch (e){
        console.error("Error creating user:", e);
      }
    /*
    console.log("1");
    const registered = await userDAO.registerUser(req.body.email, req.body.password, req.body.password2);
    console.log("8");
    console.log(registered);

    if(registered.success){
      console.log("9");
      res.cookie("refreshToken", registered.refreshToken, COOKIE_OPTIONS)
      res.send({success:true, token:token})
    }
    else{
      if(registered.error){
        res.status(500).send({"error":"Error creating user: " + registered.error});
      }
    }
    */
  }
  catch(e){
    console.error("Error registering user: ", e);
  }

  /*
  console.log(registered);

  if(registered.success){
    res.cookie("refreshToken", registered.refreshToken, COOKIE_OPTIONS)
    res.send({success:true, token:token})
  }
  else{
    if(registered.error){
      res.status(500).send({"error":"Error creating user: " + registered.error});
    }
  }
  */

  console.log("END OF POST");
});


/*
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
*/

module.exports = router;
