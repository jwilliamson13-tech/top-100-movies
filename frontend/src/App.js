import logo from './logo.svg';
import './App.css';
import {Route,Switch,Link} from "react-router-dom"
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Dashboard from "./components/dashboard";
import Movies from "./components/movies";
import Profiles from "./components/profiles";
import Profile from "./components/profile";
import Login from "./components/login";
import Register from "./components/register"

function App() {
  return (
    <div className="outerJSXWrapper">
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/movies" component={Movies}/>
        <Route exact path="/profiles" component={Profiles}/>
        <Route path="/profile/:userId" component={Profile}/>
      </Switch>
      <Footer/>
    </div>
  );
}

/*
  Removed the html below that was wrapping everything
    <div className="container-fluid">
    </div>
*/
export default App;
