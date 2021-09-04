const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  connection: {
    type: String
  },
  client_id: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  tenant: {
    type: String
  },
  transaction: {
    type: Object
  },
  request_language: {
    type: String
  },
  email_verified: {
    type: Boolean
  },
  favorite_movies: {
    type: Array,
    default: []
  },
  following:{
    type: Array,
    default: []
  }
});

const User = mongoose.model('User',UserSchema);

module.exports = User;
