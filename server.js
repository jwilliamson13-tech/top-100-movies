const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

//Database config
const db = require("./config/keys").mongoURI;


//Connect to mongodb
mongoose.connect(db,{useNewUrlParser:true})
.then(()=> {
  console.log("Successfully connected to MongoDB")}
)
.catch((e) => {
  console.error("Could not connect to MongoDB:",e)
});

//Process .env PORT is used for Heroku deployment
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
