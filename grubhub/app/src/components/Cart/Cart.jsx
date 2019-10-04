import React, { Component } from "react";
import { connect } from "react-redux";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import _ from "lodash";
import { customerActions } from "./../../js/actions";
import empty from "./../../assets/cart-empty.svg";
import { Image } from "react-bootstrap";
import "./style.css";
import Navigationbar from "../Navigationbar/Navigationbar";
import { ToastContainer } from 'react-toastify';

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
  componentWillReceiveProps(nextProps) {
    if (nextProps.cart && nextProps.cart.length) {
      const cart = nextProps.cart;
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
  }

  handlePlaceOrder = e => {
    e.preventDefault();
    const { cart, total_amount } = this.state;
    const { user_id, restaurant_id } = this.props;
    this.props.placeOrder({
      cart,
      total_amount,
      user_id,
      restaurant_id
    });
  };
  render() {
    return (
      <div>
        <Navigationbar />
        <div className="cart">
          {this.state.cart && this.state.cart.length ? (
            <div>
              <BootstrapTable
                keyField="name"
                data={this.state.cart}
                columns={this.state.cart_columns}
                bordered={true}
              />
              <div>
                <h3>Total Amount: ${this.state.total_amount}</h3>
              </div>
              <div className="place_order">
                <button
                  id="placeOrder"
                  className="btn btn-primary"
                  onClick={this.handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </div>
          ) : (
            <div className="empty_cart">
              <Image src={empty} rounded />
              <h3>Oops! Cart is empty!!!</h3>
            </div>
          )}
        </div>
        <ToastContainer autoClose={2000} />
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
