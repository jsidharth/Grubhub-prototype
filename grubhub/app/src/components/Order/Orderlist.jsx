import React, { Component } from "react";
import { connect } from "react-redux";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import BootstrapTable from "react-bootstrap-table-next";
import { ownerActions, userActions } from "../../js/actions/index";
import { Link } from "react-router-dom";
import Sidebar from './../Sidebar/Sidebar';
import Navigationbar from './../Navigationbar/Navigationbar';
import { ToastContainer, toast } from 'react-toastify';
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_orders: [],
      past_orders: [],
      past_orders_coloumns: [
        {
          dataField: "id",
          text: "Order ID",
          formatter: this.orderIdFormatter
        },
        {
          dataField: "amount",
          text: "Order Amount"
        },
        {
          dataField: "status",
          text: "Order Status"
        }
      ],
      current_order_columns: [
        {
          dataField: "id",
          text: "Order ID",
          formatter: this.orderIdFormatter
        },
        {
          dataField: "amount",
          text: "Order Amount"
        },
        {
          dataField: "status",
          text: "Order Status",
          editor: {
            type: Type.SELECT,
            options: [
              {
                label: "New",
                value: "NEW"
              },
              {
                label: "Preparing",
                value: "PREPARING"
              },
              {
                label: "Ready",
                value: "READY"
              },
              {
                label: "Delivered",
                value: "DELIVERED"
              },
              {
                label: "Cancelled",
                value: "CANCELLED"
              }
            ]
          }
        }
      ]
    };
  }

  componentDidMount() {
    if (this.props.user.type === "Owner") {
      this.props.getRestaurantOrders({
        id: this.props.restaurant.id
      });
    } else if (this.props.user.type === "Customer") {
      this.props.getCustomerOrders({
        id: this.props.match.params.id
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.restaurant.id && nextProps.user.type === "Owner") {
      nextProps.getRestaurant({
        user_id: this.props.match.params.id
      });
    }
    if (
      (nextProps.order.current_orders &&
        nextProps.order.current_orders.length) ||
      (nextProps.order.past_orders && nextProps.order.past_orders.length)
    ) {
      this.setState({
        current_orders: nextProps.order.current_orders,
        past_orders: nextProps.order.past_orders
      });
    } else {
      if (nextProps.user.type === "Owner") {
        nextProps.getRestaurantOrders({
          id: nextProps.restaurant.id
        });
      } else {
        nextProps.getCustomerOrders({
          id: nextProps.match.params.id
        });
      }
      this.setState({
        current_orders: nextProps.order.current_orders,
        past_orders: nextProps.order.past_orders
      });
    }
  }

  //Link to detail page for order ID
  orderIdFormatter = (cell, row) => {
    let detailpage_link = `/order/detail/${row.id}`;
    return <Link to={detailpage_link}>{cell}</Link>;
  };

  afterSaveCell = (oldValue, newValue, row) => {
    const payload = {
      id: row.id,
      status: row.status
    };
    this.props.changeStatus(payload);
  };

  render() {
    return (
      <div >
        {this.props.user.type === "Owner" ? <Sidebar /> : <Navigationbar />}
        <div className="order_list">
          <div>
          <h3>Current Orders</h3>
          </div>
          {this.props.user.type === "Owner" ? (
            <div>
              <BootstrapTable
                keyField="id"
                data={this.state.current_orders}
                columns={this.state.current_order_columns}
                bordered={true}
                cellEdit={cellEditFactory({
                  mode: "click",
                  blurToSave: true,
                  afterSaveCell: (oldValue, newValue, row) => {
                    this.afterSaveCell(oldValue, newValue, row);
                  }
                })}
              />
            </div>
          ) : (
            <div>
              <BootstrapTable
                keyField="id"
                data={this.state.current_orders}
                columns={this.state.current_order_columns}
                bordered={true}
              />
            </div>
          )}

          <div>
          <h3>Past Orders</h3>
          </div>
          <div>
            <BootstrapTable
              keyField="id"
              data={this.state.past_orders}
              columns={this.state.past_orders_coloumns}
              bordered={true}
            />
          </div>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    restaurant: state.restaurant,
    order: state.order
  };
};

const mapDispatchToProps = dispatch => ({
  getRestaurantOrders: payload =>
    dispatch(ownerActions.getRestaurantOrders(payload)),
  changeStatus: payload => dispatch(ownerActions.changeStatus(payload)),
  getCustomerOrders: payload =>
    dispatch(ownerActions.getCustomerOrders(payload)),
  getUser: payload => dispatch(userActions.getUser(payload)),
  getRestaurant: payload => dispatch(ownerActions.getRestaurant(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
