import React, { Component } from "react";
import { connect } from "react-redux";
import { ownerActions, userActions } from "../../js/actions/index";
import { Link } from "react-router-dom";
import _ from "lodash";
import Navigationbar from "../Navigationbar/Navigationbar";
import { ToastContainer } from "react-toastify";
import { Container, Card } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
//TODO: Change to upcoming orders
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_orders_coloumn: {
        id: "column_1",
        title: "Current Orders",
        orders: []
      }
    };
  }

  componentDidMount() {
    this.props.getCustomerOrders({
      id: this.props.match.params.id
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.order.current_orders &&
      nextProps.order.current_orders.length
    ) {
      const current_orders_coloumn = Object.assign(
        {},
        this.state.current_orders_coloumn,
        {
          orders: nextProps.order.current_orders
        }
      );
      this.setState({
        current_orders_coloumn
      });
    } else {
      nextProps.getCustomerOrders({
        id: nextProps.match.params.id
      });
      const current_orders_coloumn = Object.assign(
        {},
        this.state.current_orders_coloumn,
        {
          orders: nextProps.order.current_orders
        }
      );
      this.setState({
        current_orders_coloumn
      });
    }
  }

  //Link to detail page for order ID
  orderIdFormatter = (cell, row) => {
    let detailpage_link = `/order/detail/${row._id}`;
    return <Link to={detailpage_link}>{cell}</Link>;
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const updatedOrders = Array.from(this.state.current_orders_coloumn.orders);
    const movedOrder = _.find(updatedOrders, { _id: draggableId });
    updatedOrders.splice(source.index, 1);
    updatedOrders.splice(destination.index, 0, movedOrder);
    const current_orders_coloumn = Object.assign(
      {},
      this.state.current_orders_coloumn,
      {
        orders: updatedOrders
      }
    );
    this.setState({
      current_orders_coloumn
    });
  };

  render() {
    return (
      <div>
        {<Navigationbar />}
        <div className="order_list">
          <div>
            <h3>Upcoming Orders</h3>
          </div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {
              <div className="past_orders">
                <Droppable droppableId={this.state.current_orders_coloumn.id}>
                  {provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {this.state.current_orders_coloumn.orders.map(
                        (order, index) => {
                          console.log(order);
                          return (
                            <Draggable draggableId={order._id} index={index}>
                              {provided => (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}>
                                  <Link
                                    key={order._id}
                                    to={`/order/detail/${order._id}`}>
                                    <div className="m-2">
                                      <Card>
                                        <Card.Body>
                                          <Card.Title>
                                            {" "}
                                            ID: {order._id}
                                          </Card.Title>
                                          <Card.Text>
                                            <label>
                                              Status: {order.status}
                                            </label>
                                            <br></br>
                                            <label>
                                              Amount: ${order.amount}
                                            </label>
                                          </Card.Text>
                                        </Card.Body>
                                      </Card>
                                    </div>
                                  </Link>
                                </div>
                              )}
                            </Draggable>
                          );
                        }
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            }
          </DragDropContext>
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
  getCustomerOrders: payload =>
    dispatch(ownerActions.getCustomerOrders(payload)),
  getUser: payload => dispatch(userActions.getUser(payload)),
  getRestaurant: payload => dispatch(ownerActions.getRestaurant(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
