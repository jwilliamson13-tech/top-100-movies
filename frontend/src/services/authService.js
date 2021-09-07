import http from "../http-common";

class AuthService{
  getAuth(){
    return http.get('/users/profile',{mode: 'no-cors'});
  }
}

export default new AuthService();
