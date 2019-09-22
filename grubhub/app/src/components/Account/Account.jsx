import React, { Component } from "react";
import { connect } from "react-redux";
import {userActions, ownerActions} from "./../../js/actions/index";
import './style.css';
class Account extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      type: "",
      address: "",
      image: "",
      restaurant_id: "",
      restaurant_name: "",
      restaurant_address: "",
      restaurant_zipcode: "",
      restaurant_image: "",
      cuisine: "",
      valid_update: ""
    };
  }
  componentDidMount() {
      const {
        id,
        first_name,
        last_name,
        email,
        phone,
        type,
        address,
        image,
      } = this.props.user;
      if(type === "Owner") {
        this.props.getRestaurant({
          user_id: id
        });
      }
      const restaurant = this.props.restaurant;
      this.setState({
        id,
        first_name,
        last_name,
        email,
        phone,
        type,
        address,
        image,
        restaurant_id: restaurant.id,
        restaurant_name: restaurant.name,
        restaurant_address: restaurant.address,
        restaurant_zipcode: restaurant.zipcode,
        restaurant_image: restaurant.image,
        cuisine: restaurant.cuisine
      });
  }
  componentWillReceiveProps(nextProps) {
    const {
      id,
      first_name,
      last_name,
      email,
      phone,
      type,
      address,
      image
    } = nextProps.user;
    const restaurant = nextProps.restaurant;
    this.setState({
      id,
      first_name,
      last_name,
      email,
      phone,
      type,
      address,
      image,
      restaurant_id: restaurant.id,
      restaurant_name: restaurant.name,
      restaurant_address: restaurant.address,
      restaurant_zipcode: restaurant.zipcode,
      restaurant_image: restaurant.image,
      cuisine: restaurant.cuisine,
      valid_update: nextProps.valid_update
    });
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleUpdate = e => {
    e.preventDefault();
    const payload = this.state;
    this.props.updateUser(payload);
  };
  render() {
    const validUpdate = this.state.valid_update ? (<div><span>Updated Successfully</span></div>) : null;
    return (
      <div className="container shadow p-2 account_info_form">
        <form onSubmit={e => this.handleUpdate(e)}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control first_name"
              id="first_name"
              placeholder="First Name"
              value={this.state.first_name}
              onInput={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control last_name"
              id="last_name"
              placeholder="Last Name"
              value={this.state.last_name}
              onInput={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control email"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              defaultValue={this.state.email}
              readOnly></input>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Phone"
              value={this.state.phone}
              onInput={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              className="form-control"
              id="address"
              placeholder="Address"
              value={this.state.address}
              onInput={this.handleChange}
            />
          </div>
          {this.state.type === "Owner" ? (
            <div>
              <div className="form-group">
                <label htmlFor="restaurant_name">Restaurant Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="restaurant_name"
                  placeholder="Name of your restaurant"
                  value={this.state.restaurant_name}
                  onInput={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cuisine">Cusine</label>
                <input
                  type="text"
                  className="form-control"
                  id="cuisine"
                  placeholder="Cusine"
                  value={this.state.cuisine}
                  onInput={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cuisine">Restaurant Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="restaurant_address"
                  placeholder="Restaurant Address"
                  value={this.state.restaurant_address}
                  onInput={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cuisine">Restaurant Zipcode</label>
                <input
                  type="text"
                  className="form-control"
                  id="restaurant_zipcode"
                  placeholder="Restaurant Zipcode"
                  value={this.state.restaurant_zipcode}
                  onInput={this.handleChange}
                />
              </div>
            </div>
          ) : null}
          <button type="submit" className="btn btn-primary m-3">
            Update
          </button>
          {validUpdate}
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    restaurant: state.restaurant,
    valid_update: state.user.valid_update
  };
};
const mapDispatchToProps = dispatch => ({
  updateUser: payload => dispatch(userActions.updateUser(payload)),
  getRestaurant: payload => dispatch(ownerActions.getRestaurant(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
