import React, { Component } from 'react';
import { connect } from 'react-redux';
// import logo from './../../assets/grubhub-1177056.png';
import './style.css';
import { userActions } from '../../js/actions/index';
import { ToastContainer } from 'react-toastify';

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSignIn = e => {
    e.preventDefault();
    const payload = this.state;
    this.props.loginUser(payload);
  };
  render() {
    return (
      <div className="container shadow p-3 singup_form">
        {/* <img src={logo} className="rounded mx-auto d-block signinlogo" alt="Logo"></img> */}
        <form onSubmit={e => this.handleSignIn(e)}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={this.handleChange}
            ></input>
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
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary m-3">
            Sign in
          </button>
        </form>
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loginUser: payload => dispatch(userActions.loginUser(payload, ownProps)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin);
