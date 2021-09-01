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
  static async addMovies(userId,moviesList){
    console.log(userId);
    console.log(moviesList);
    //Get a list of current movies
    const currentMovies = User.findById(userId).favorite_movies ? currentMovies : [];
    var newMoviesList = currentMovies;

    //Check if new movies are not in movies list
    moviesList.forEach((movie) =>{
      if(!currentMovies.includes(movie)){
        newMoviesList.push(movie);
      }
    })
    console.log(newMoviesList);
    //Update user object
    const updateUser = await User.findOneAndUpdate({_id:userId},{favorite_movies:newMoviesList},{new:true});

    //Return success based on update
    updateUser ? return true : return false;
  }

  //Remove movies from user

  //Add following to user

  //Removing following from user
};


module.exports = userDAO;
