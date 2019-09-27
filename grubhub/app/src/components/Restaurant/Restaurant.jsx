import React, { Component } from "react";
import { connect } from "react-redux";
import { customerActions } from "../../js/actions";
import {Container, Row, Card, Form, Col} from "react-bootstrap";
import tea from "./../../assets/tea.jpg";
import _ from 'lodash';
// import banner from "./../../assets/Restaurant-test.jpg";

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
      const cart = this.state.cart;
      cart[e.target.id] = e.target.value
      this.setState({
          cart
      });
  }
  handleAddToCart = e => {
    e.preventDefault();
    const items = _.chain(this.state.current_restaurant.menu).map('items').concat().flatten().value();
    if(items && items.length) {
        const cart = items.map(item => {
            if(this.state.cart[item.id]) {
                return({
                    id: item.id,
                    name: item.name,
                    quantity: this.state.cart[item.id],
                    rate: item.rate ? item.rate*this.state.cart[item.id] : 0
                });
            }
        });
        this.props.addToCart({
            cart: _.compact(cart)
        });
    }
  }
  render() {
    const { current_restaurant } = this.state;
    return (
      <div>
        <div className="container-fluid">
          {/* <img src={banner} className="img-fluid" alt="Responsive"/> */}
        </div>
        <div className="restaurant-detail">
          <div className="form-group row">
            <label className="col-sm-5 col-form-label col-form-label-lg m-2">
              {current_restaurant.name}
            </label>
            <div>
            <button className ="btn btn-success m-3" id="addToCart" onClick={this.handleAddToCart}>Add to Cart</button>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-5 col-form-label col-form-labelm-2">
              {current_restaurant.address}
            </label>
          </div>
          <div className="container">
          {current_restaurant.menu && current_restaurant.menu.length
            ? current_restaurant.menu.map(eachSection => {
                return (
                  <div>
                    <label className="col-sm-2 col-form-label col-form-label-lg">
                      {eachSection.section}
                    </label>
                    <div>
                      <Container>
                        <Row>
                          {eachSection.items.map(item => {
                            return (
                                <div className="m-2">
                                <Card style={{ width: '14rem' }} key = {item.id}>
                                    <Card.Img variant="top" src={tea}/>
                                    <Card.Body>
                                      <Card.Title>{item.name}</Card.Title>
                                      <Card.Text>
                                        <p>{item.description}</p>
                                        <p>${item.rate}</p>
                                        <Form.Group as={Row}>
                                            <Form.Label column sm="6">
                                            Quantity
                                            </Form.Label>
                                            <Col sm="6">
                                            <Form.Control type="number" placeholder="" min="0" max="10" id = {item.id} onChange={this.handleQuantity}/>
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
  getRestaurantDetails: payload => dispatch(customerActions.getRestaurantDetails(payload)),
  addToCart: payload => dispatch(customerActions.addToCart(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant);
