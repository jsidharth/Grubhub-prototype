import React, { Component } from "react";
import { connect } from "react-redux";
import { itemActions } from "./../../js/actions/index";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./style.css";
import Sidebar from "../Sidebar/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      description: "",
      section: "",
      rate: "",
      image: "",
      restaurant_id: "",
      update: false,
      file: "Choose file"
    };
  }
  //TODO: Refresh issue for restaurant id
  componentDidMount() {
    if (this.props.match.params.item_id) {
      this.props.getItem({
        item_id: this.props.match.params.item_id
      });
    } else {
      this.setState({
        restaurant_id: this.props.restaurant_id
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.id && this.props.match.params.item_id) {
      const { id, name, description, section, rate, image } = nextProps.item;
      this.setState({
        id,
        name,
        description,
        section,
        rate,
        image,
        restaurant_id: nextProps.restaurant_id,
        update: true,
        file: "Choose file"
      });
    } else {
      this.setState({
        image: nextProps.item.image
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleAdd = e => {
    e.preventDefault();
    const payload = this.state;
    this.props.addItem(payload);
  };

  handleUpdate = e => {
    e.preventDefault();
    const payload = this.state;
    this.props.updateItem(payload);
  };

  handleDelete = e => {
    e.preventDefault();
    const payload = {
      user_id: this.props.user.id,
      item_id: this.state.id
    };
    this.props.deleteItem(payload);
  };

  handleUpload = e => {
    e.preventDefault();
    const data = new FormData();
    if(this.uploadInput.files && this.uploadInput.files.length) {
      data.append('file', this.uploadInput.files[0] || '');
      this.props.uploadImage(data);
    } else {
      toast.warning("No file selected!");
    }
  };

  render() {
    return (
      <div>
        <Sidebar />
        <div className="container p-3 item_detail">
          <form>
            <div className="form-group">
              <label htmlFor="name">Item Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Item Name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="section">Section</label>
              <input
                type="text"
                className="form-control"
                id="section"
                placeholder="Section"
                value={this.state.section}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rate">Rate</label>
              <input
                type="text"
                className="form-control"
                id="rate"
                placeholder="rate"
                value={this.state.rate}
                onChange={this.handleChange}
              />
            </div>
            <label htmlFor="image">Image</label>
            <div className="form-inline image-upload">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="file"
                  accept="image/*"
                  ref={ref => {
                    this.uploadInput = ref;
                  }}
                  aria-describedby="fileUpload"
                  onChange={e => {
                    if (e.target.value) {
                      let fileName = e.target.value.split("\\");
                      this.setState({
                        file:
                          fileName && fileName.length
                            ? fileName[fileName.length - 1]
                            : "Choose file"
                      });
                    }
                  }}
                />
                <label
                  className="custom-file-label"
                  id="image-label"
                  htmlFor="file">
                  {this.state.file}
                </label>
              </div>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary m-2"
                  type="button"
                  id="fileUpload"
                  onClick={this.handleUpload}>
                  Upload
                </button>
              </div>
            </div>
            <div className="form-group">
              <Container style={{ width: "30rem" }}>
                <Row>
                  <Col xs={6} md={4}>
                    <Image src={this.state.image} rounded />
                  </Col>
                </Row>
              </Container>
            </div>
            {this.state.update ? (
              <div>
                <button
                  type="submit"
                  className="btn btn-primary m-3"
                  onClick={e => this.handleUpdate(e)}>
                  Update
                </button>
                <button
                  type="submit"
                  className="btn btn-primary m-3"
                  onClick={e => this.handleDelete(e)}>
                  Delete
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="btn btn-primary m-3"
                onClick={e => this.handleAdd(e)}>
                Add
              </button>
            )}
          </form>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restaurant_id: state.restaurant.id,
  item: state.item || {},
  user: state.user
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addItem: payload => dispatch(itemActions.addItem(payload)),
  getItem: payload => dispatch(itemActions.getItem(payload)),
  updateItem: payload => dispatch(itemActions.updateItem(payload)),
  deleteItem: payload => dispatch(itemActions.deleteItem(payload, ownProps)),
  uploadImage: payload => dispatch(itemActions.uploadImage(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);
