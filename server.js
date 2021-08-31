const express = require('express');
const { auth } = require('express-openid-connect');
const config = require("./config/config.js");


const app = express();

//Process .env PORT is used for Heroku deployment
const port = process.env.PORT || 3000;

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use('/', require('./routes/index.js'));
app.use('/api/v1', require('./routes/api.js'));


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
