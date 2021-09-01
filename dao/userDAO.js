const User = require('../models/User');
const mongoose = require('mongoose');

console.log(User);

class userDAO{

  static async getAllUsers(){

    try{
      const users = User.find({});
      return users;
    } catch(e){
      console.error("Error getting users: ", e);
    }
  }

  static async getUser(userId){
    try{

      const user = User.findById(userId);

      return user;
    } catch(e){
      console.error("Error getting user: ", e);
    }
  }

  //Delete User
  static async deleteUser(userId){
    try{

      const user = await User.findByIdAndDelete(userId);

      return true;
    } catch(e){
      console.error("Error getting user: ", e);
    }
  }
  //Add movies to user

  //Remove movies from user

  //Add following to user

  //Removing following from user
};


module.exports = userDAO;
