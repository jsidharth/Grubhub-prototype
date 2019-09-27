import React, { Component } from "react";
import { connect } from "react-redux";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import _ from "lodash";
import { customerActions } from "./../../js/actions";
import empty from './../../assets/emptycart.png';
import {Container, Row, Col, Image} from 'react-bootstrap';
import './style.css';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      total_amount: 0,
      cart_columns: [
        {
          dataField: "name",
          text: "Item Name"
        },
        {
          dataField: "quantity",
          text: "Quantity"
        },
        {
          dataField: "rate",
          text: "Price"
        }
      ]
    };
  }

  componentDidMount() {
    const cart = this.props.cart;
    const total_amount =
      cart && cart.length
        ? _.chain(cart)
            .map("rate")
            .reduce((sum, item) => sum + item, 0)
            .value()
        : 0;
    this.setState({
      cart,
      total_amount
    });
  }

  handlePlaceOrder = e => {
    e.preventDefault();
    const {cart, total_amount} = this.state;
    const {user_id, restaurant_id} = this.props;
    this.props.placeOrder({
        cart,
        total_amount,
        user_id,
        restaurant_id
    })
  };
  render() {
    return (
        <div>
        {this.state.cart && this.state.cart.length ? (<div>
            <BootstrapTable
              keyField="name"
              data={this.state.cart}
              columns={this.state.cart_columns}
              bordered={true}
            />
            <div>
              <label className="col-sm-5 col-form-label col-form-labelm-2">
                Total Amount:
              </label>
              <label className="col-sm-5 col-form-label col-form-labelm-2">
                {this.state.total_amount}
              </label>
            </div>
            <div>
              <button
                id="placeOrder"
                className="btn btn-primary"
                onClick={this.handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>) : (<div className="empty_cart">
          <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image src={empty} rounded />
            </Col>
            </Row>
            </Container>
          </div>)}
          </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.customer.cart,
  user_id: state.user.id,
  restaurant_id: state.customer.current_restaurant.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  placeOrder: payload => dispatch(customerActions.placeOrder(payload, ownProps))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
