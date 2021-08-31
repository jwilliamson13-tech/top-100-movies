const { requiresAuth } = require('express-openid-connect');
const express = require('express');
const router = express.Router();
const tmdbDAO = require("../dao/tmdbDAO.js");

console.log(tmdbDAO);
// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

//Test area testing movie API
router.get('/movies', (req,res) => {
  //NEED TO GET AWAIT WORKING
  var movies = tmdbDAO.getMovies();
  console.log(movies.status);
  res.send(JSON.stringify(movies));
});

module.exports = router;
