import React, { Component } from 'react';
import logo from './../../assets/grubhub-logo.jpg';
import { Link } from 'react-router-dom';

class Landingpage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md front_logo">
            <img className="img-responsive" src={logo} alt="Grubhub"></img>
          </div>
          <div className="col-md text-center landing_button">
            <Link to="/signup">
              <button className="btn btn-outline-primary btn-lg m-5">Sign Up</button>
            </Link>
            <Link to="/signin">
              <button className="btn btn-outline-primary btn-lg">Sign In</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Landingpage;
