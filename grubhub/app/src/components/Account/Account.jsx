import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions, ownerActions } from './../../js/actions/index';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Sidebar from './../Sidebar/Sidebar';
import Navigationbar from './../Navigationbar/Navigationbar';
import './style.css';
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      type: '',
      address: '',
      image: '',
      restaurant_id: '',
      restaurant_name: '',
      restaurant_address: '',
      restaurant_zipcode: '',
      restaurant_image: '',
      cuisine: '',
      valid_update: '',
      profile_pic_file: 'Choose file',
      restaurant_pic_file: 'Choose file',
    };
  }
  componentDidMount() {
    const { id, first_name, last_name, email, phone, type, address, image } = this.props.user;
    if (type === 'Owner') {
      this.props.getRestaurant({
        restaurant_id: this.props.restaurant.id,
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
      cuisine: restaurant.cuisine,
    });
  }
  componentWillReceiveProps(nextProps) {
    const { id, first_name, last_name, email, phone, type, address, image } = nextProps.user;
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
      valid_update: nextProps.valid_update,
    });
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleUpdate = e => {
    e.preventDefault();
    const payload = this.state;
    this.props.updateUser(payload);
  };
  handleUpload = e => {
    e.preventDefault();
    const data = new FormData();
    //TODO: add toaster for empty file
    if (e.target.value === 'profile_pic') {
      if(this.uploadProfile.files && this.uploadProfile.files.length) {
        data.append('file', this.uploadProfile.files[0] || '');
        this.props.uploadProfileImage({
          user_id: this.state.id,
          data
        });
      } else {
        toast.warning("No file selected!");
      }
    } else if (e.target.value === 'restaurant_pic') {
      if(this.uploadRestaurant.files && this.uploadRestaurant.files.length) {
        data.append('file', this.uploadRestaurant.files[0] || '');
        this.props.uploadRestaurantImage({
          restaurant_id: this.state.restaurant_id,
          data
        });
      } else {
        toast.warning("No file selected!");
      }
    }
  };
  render() {
    return (
      <div>
        {this.state.type === 'Owner' ? <Sidebar /> : <Navigationbar />}
        <div className="container shadow p-2 account_info_form">
          <form onSubmit={e => this.handleUpdate(e)} className="custom-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control first_name"
                id="first_name"
                placeholder="First Name"
                pattern="[a-z A-z]+"
                title="Only Alphabets"
                value={this.state.first_name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control last_name"
                id="last_name"
                placeholder="Last Name"
                pattern="[a-z A-z]+"
                title="Only Alphabets"
                value={this.state.last_name}
                onChange={this.handleChange}
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
                readOnly
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Phone"
                pattern="[0-9\-]+"
                title="Only numbers and hyphens"
                required
                value={this.state.phone}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                className="form-control"
                id="address"
                placeholder="Address"
                required
                value={this.state.address}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group image-upload">
              <label htmlFor="image">Image</label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="file"
                  accept="image/*"
                  ref={ref => {
                    this.uploadProfile = ref;
                  }}
                  aria-describedby="fileUpload"
                  onChange={e => {
                    if (e.target.value) {
                      let fileName = e.target.value.split('\\');
                      this.setState({
                        profile_pic_file:
                          fileName && fileName.length
                            ? fileName[fileName.length - 1]
                            : 'Choose file',
                      });
                    }
                  }}
                />
                <label className="custom-file-label" id="image-label" htmlFor="file">
                  {this.state.profile_pic_file}
                </label>
              </div>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary m-2"
                  type="button"
                  id="fileUpload"
                  value="profile_pic"
                  onClick={this.handleUpload}
                >
                  Upload
                </button>
              </div>
            </div>
            <div className="form-group" style={{ width: '60rem' }}>
              <Container>
                <Row>
                  <Col xs={6} md={4}>
                    <Image src={this.state.image} roundedCircle />
                  </Col>
                </Row>
              </Container>
            </div>
            {this.state.type === 'Owner' ? (
              <div>
                <div className="form-group">
                  <label htmlFor="restaurant_name">Restaurant Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="restaurant_name"
                    placeholder="Name of your restaurant"
                    pattern="[a-z A-z]+"
                    title="Only Alphabets"
                    required
                    value={this.state.restaurant_name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cuisine">Cusine</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cuisine"
                    placeholder="Cusine"
                    pattern="[a-z A-z]+"
                    title="Only Alphabets"
                    required
                    value={this.state.cuisine}
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cuisine">Restaurant Zipcode</label>
                  <input
                    type="number"
                    className="form-control"
                    id="restaurant_zipcode"
                    placeholder="Restaurant Zipcode"
                    pattern="[0-9]+"
                    title="Only Alphabets"
                    required
                    value={this.state.restaurant_zipcode}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group image-upload">
                  <label htmlFor="image">Restaurant Image</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="file"
                      accept="image/*"
                      ref={ref => {
                        this.uploadRestaurant = ref;
                      }}
                      aria-describedby="fileUpload"
                      onChange={e => {
                        if (e.target.value) {
                          let fileName = e.target.value.split('\\');
                          this.setState({
                            restaurant_pic_file:
                              fileName && fileName.length
                                ? fileName[fileName.length - 1]
                                : 'Choose file',
                          });
                        }
                      }}
                    />
                    <label className="custom-file-label" id="image-label" htmlFor="file">
                      {this.state.restaurant_pic_file}
                    </label>
                  </div>
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary m-2"
                      type="button"
                      id="fileUpload"
                      value="restaurant_pic"
                      onClick={this.handleUpload}
                    >
                      Upload
                    </button>
                  </div>
                </div>
                <div className="form-group" style={{ width: '60rem' }}>
                  <Container>
                    <Row>
                      <Col xs={6} md={4}>
                        <Image src={this.state.restaurant_image} rounded />
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            ) : null}
            <button type="submit" className="btn btn-primary m-3">
              Update
            </button>
          </form>
          <ToastContainer autoClose={2000} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    restaurant: state.restaurant,
    valid_update: state.user.valid_update,
  };
};
const mapDispatchToProps = dispatch => ({
  updateUser: payload => dispatch(userActions.updateUser(payload)),
  getRestaurant: payload => dispatch(ownerActions.getRestaurant(payload)),
  uploadProfileImage: payload => dispatch(userActions.uploadProfileImage(payload)),
  uploadRestaurantImage: payload => dispatch(ownerActions.uploadRestaurantImage(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);
