import http from "../http-common";

class MoviesDataService{
  getAll(page=0){
    return http.get(`?page=${page}`);
  }

  getMovies(name){
    return http.get(`/movies?name=${name}`);
  }

  getMovie(movieId){

  }

  getUsers(){
    return http.get(`/users`,{mode:'no-cors'});
  }

  getUser(userId){
    return http.get(`/users/${userId}`,{mode:'no-cors'});
  }
}

export default new MoviesDataService();
