import React, { Component } from "react";
import { connect } from "react-redux";
import { itemActions } from "./../../js/actions/index";
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
      update: false
    };
  }
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
    if (nextProps.item.id) {
      const { id, name, description, section, rate, image } = nextProps.item;
      this.setState({
        id,
        name,
        description,
        section,
        rate,
        image,
        restaurant_id: nextProps.restaurant_id,
        update: true
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
      user_id: this.props.user_id,
      item_id: this.state.id
    };
    this.props.deleteItem(payload);
  };

  render() {
    return (
      <div className="container shadow p-3 item_detail">
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
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="text"
              className="form-control"
              id="image"
              placeholder="image"
              value={this.state.image}
              onChange={this.handleChange}
            />
          </div>
          {this.state.update ? (
            <button
              type="submit"
              className="btn btn-primary m-3"
              onClick={e => this.handleUpdate(e)}>
              Update
            </button>
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
    );
  }
}

const mapStateToProps = state => ({
  restaurant_id: state.restaurant.id,
  item: state.item || {},
  user_id: state.user.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addItem: payload => dispatch(itemActions.addItem(payload)),
  getItem: payload => dispatch(itemActions.getItem(payload)),
  updateItem: payload => dispatch(itemActions.updateItem(payload)),
  deleteItem: payload => dispatch(itemActions.deleteItem(payload, ownProps))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);
