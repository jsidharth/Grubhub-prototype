import React, { Component } from "react";
import { connect } from "react-redux";
import { customerActions } from "../../js/actions";
import { Container, Row, Card, Form, Col } from "react-bootstrap";
import _ from "lodash";
import Navigationbar from "../Navigationbar/Navigationbar";
import "./style.css";

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_restaurant: {
        id: "",
        name: "",
        cuisine: "",
        address: "",
        zipcode: "",
        image: "",
        menu: ""
      },
      cart: {}
    };
  }
  componentDidMount() {
    //Load data on page load
    this.props.getRestaurantDetails({
      restaurant_id: this.props.match.params.restaurant_id
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.current_restaurant) {
      this.setState({
        current_restaurant: nextProps.current_restaurant
      });
    }
  }
  handleQuantity = e => {
    if (e.target.value < 0) {
      e.target.value = 0;
    } else if (e.target.value > 10) {
      e.target.value = 10;
    }
    const cart = this.state.cart;
    cart[e.target.id] = e.target.value;
    this.setState({
      cart
    });
  };
  handleAddToCart = e => {
    e.preventDefault();
    const items = _.chain(this.state.current_restaurant.menu)
      .map("items")
      .concat()
      .flatten()
      .value();
    if (items && items.length) {
      const cart = items.map(item => {
        if (this.state.cart[item.id] && this.state.cart[item.id] !== 0) {
          return {
            id: item.id,
            name: item.name,
            quantity: this.state.cart[item.id],
            rate: item.rate ? item.rate * this.state.cart[item.id] : 0
          };
        }
      });
      this.props.addToCart({
        cart: _.compact(cart)
      });
    }
  };
  render() {
    const { current_restaurant } = this.state;
    return (
      <div>
        <Navigationbar />

        <div className="form-group row restaurant_title">
          <div className="image-container">
            <img
              src={current_restaurant.image}
              className="img-thumbnail"
              alt="Responsive"
            />
          </div>
          <div className="restaurant_name">
            <h1>{current_restaurant.name}</h1>
            <h5>{current_restaurant.address}</h5>
          </div>
        </div>
        <div className="restaurant-detail">
          <div className="container">
            <h3 className="menu">MENU</h3>
            {current_restaurant.menu && current_restaurant.menu.length
              ? current_restaurant.menu.map(eachSection => {
                  return (
                    <div className="section">
                      <h4>{eachSection.section}</h4>
                      <div>
                        <Container>
                          <Row>
                            {eachSection.items.map(item => {
                              return (
                                <div className="m-2">
                                  <Card
                                    style={{ width: "14rem" }}
                                    key={item.id}>
                                    <Card.Img variant="top" src={item.image} className="card-img-top" alt="item image"/>
                                    <Card.Body>
                                      <Card.Title>{item.name}</Card.Title>
                                      <Card.Text>
                                        <label>{item.description}</label>
                                        <br></br>
                                        <label>${item.rate}</label>
                                        <Form.Group as={Row}>
                                          <Form.Label column sm="6">
                                            Quantity
                                          </Form.Label>
                                          <Col sm="6">
                                            <Form.Control
                                              type="number"
                                              placeholder=""
                                              min="0"
                                              max="10"
                                              id={item.id}
                                              onChange={this.handleQuantity}
                                            />
                                          </Col>
                                        </Form.Group>
                                      </Card.Text>
                                    </Card.Body>
                                  </Card>
                                </div>
                              );
                            })}
                          </Row>
                        </Container>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  current_restaurant: state.customer.current_restaurant
});
const mapDispatchToProps = dispatch => ({
  getRestaurantDetails: payload =>
    dispatch(customerActions.getRestaurantDetails(payload)),
  addToCart: payload => dispatch(customerActions.addToCart(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant);
