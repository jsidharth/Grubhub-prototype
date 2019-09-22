import React, { Component } from "react";
import { connect } from "react-redux";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import { ownerActions } from "./../../js/actions/index";
import {Link} from 'react-router-dom';

const orderStatus = [
  {
    name: "New",
    value: "NEW"
  },
  {
    name: "Preparing",
    value: "PREPARING"
  },
  {
    name: "Ready",
    value: "READY"
  },
  {
    name: "Delivered",
    value: "DELIVERED"
  },
  {
    name: "Cancelled",
    value: "CANCELLED"
  }
];
// Order status drop down
function dropdownFormatter(cell, row) {
  return (
    <select value={row.status} onClick={this.changeStatus}>
      {orderStatus.map(status => (
        <option value={status.value}>{status.name}</option>
      ))}
    </select>
  );
}
//Link to detail page for order ID
const orderIdFormatter = (cell, row) => {
  let detailpage_link  = `/order/detail/${row.id}`
return (
  <Link to = {detailpage_link}>
    {cell}
  </Link>
)
}

const columns = [
  {
    dataField: "id",
    text: "Order ID",
    formatter: orderIdFormatter
  },
  {
    dataField: "amount",
    text: "Order Amount"
  },
  {
    dataField: "status",
    text: "Order Status",
    formatter: dropdownFormatter
  }
];

class Order extends Component {
  constructor() {
    super();
    this.state = {
      current_orders: [],
      past_orders: []
    };
  }

  componentDidMount() {
    this.props.getOrders({
      id: this.props.restaurant.id
    });
  };

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.order.current_orders &&
      nextProps.order.current_orders.length) ||
      (nextProps.order.past_orders &&
        nextProps.order.past_orders.length)
    ) {
      this.setState({
        current_orders: nextProps.order.current_orders,
        past_orders: nextProps.order.past_orders
      });
    }
  };

  changeStatus = e => {
    // TODO: Call updateOrder action
    console.log(e.target.value)
  }
  render() {
    return (
      <BootstrapTable
        keyField="id"
        data={this.state.current_orders}
        columns={columns}
        bordered= {true}
      />
      
    );
  }
}

const mapStateToProps = state => {
  return {
    restaurant: state.restaurant,
    order: state.order
  };
};
const mapDispatchToProps = dispatch => ({
  getOrders: payload => dispatch(ownerActions.getOrders(payload)),
  changeStatus: payload => dispatch(ownerActions.changeStatus(payload))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
