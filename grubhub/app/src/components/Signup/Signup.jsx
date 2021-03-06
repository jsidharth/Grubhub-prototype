import React, { Component } from "react";
import {connect} from "react-redux";
import {userActions} from '../../js/actions/index';
import { ToastContainer } from 'react-toastify';

export class Signup extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      type: 'Customer'
    };
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleSignUp = (e) => {
    e.preventDefault();
    const payload = this.state;
    this.props.addUser(payload);
  }
  render() {
    return (
      <div className="container shadow p-3 singup_form">
        <form onSubmit={(e) => this.handleSignUp(e)}>
        <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control first_name"
              id="first_name"
              pattern="[a-z A-z]+"
              title="Only Alphabets"
              required
              placeholder="First Name"
              onChange = {this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Last Name"
              pattern="[a-z A-z]+"
              title="Only Alphabets"
              required
              onChange = {this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
              onChange = {this.handleChange}></input>
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              required
              onChange = {this.handleChange}
            />
          </div>
          <label>User type:</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="userTypeRadio"
              id="type"
              value="Customer"
              defaultChecked
              onChange = {this.handleChange}
            />
            <label className="form-check-label" htmlFor="customerRadio">
              Customer
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="userTypeRadio"
              id="type"
              value="Owner"
              onChange = {this.handleChange}
            />
            <label className="form-check-label" htmlFor="ownerRadio">
              Owner
            </label>
          </div>
          <button type="submit" className="btn btn-primary m-3 sign-up-btn">
            Sign Up
          </button>
        </form>
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addUser: payload => dispatch(userActions.addUser(payload, ownProps))
});

export default connect(null, mapDispatchToProps)(Signup);
