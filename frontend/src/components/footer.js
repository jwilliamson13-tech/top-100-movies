import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = props => {
  return (
    <footer className="text-center text-lg-start bg-dark text-light">
      <div className="container p-4 pb-0">
        <section className="">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase text-center">Top 100 Movies</h5>

              <p>
                I wanted to create a website where you can compile your favorite movies.
                Feel free to take a look at my code and use it in your own projects.
                I hope you enjoy. If you have any questions, please reach out!
              </p>
            </div>
            <div className="col-lg-4 col-md-10 mb-4 mb-md-0">
              <h5 className="text-uppercase text-center">Credits</h5>
              <p className="">This product uses the TMDB API but is not endorsed or certified by <a href="www.themoviedb.org" >TMDB</a></p>
              <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" class="w-25 mx-auto d-block"/>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase text-center">Contact Me</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" >EMAIL</a>
                </li>
                <li>
                  <a href="#!" >GITHUB</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <div className="text-center p-3">
        2020 LICENSE TYPE HERE:
        <a  href="https://mdbootstrap.com/">LINK TO LICESNSE HERE</a>
      </div>
    </footer>
  );
};

export default Footer;
