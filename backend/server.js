const express = require('express');
const { auth } = require('express-openid-connect');
const config = require("./config/config.js");
const dbConn = require("./config/databaseConnector.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport")

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config()
}

require("./strategies/JwtStrategy")
require("./strategies/LocalStrategy")
require("./authenticate")

//Express
const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(passport.initialize())

//Process .env PORT is used for Heroku deployment
const port = process.env.PORT || 3000;

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(cors());
app.use(auth(config));
app.use('/', require('./routes/index.js'));
app.use('/api/v1', require('./routes/api.js'));
app.use('/users', require('./routes/users.js'));


//Connect to mongoDB
const db = dbConn.connect();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
