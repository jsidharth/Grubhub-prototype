import React, { Component } from "react";
import { connect } from "react-redux";
import { ownerActions, userActions } from "../../js/actions";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import Sidebar from "./../Sidebar/Sidebar";
import Navigationbar from "./../Navigationbar/Navigationbar";
import "./style.css";
import { Accordion, Card } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';

const columns = [
  {
    dataField: "name",
    text: "Name"
  },
  {
    dataField: "quantity",
    text: "Quantity"
  },
  {
    dataField: "rate",
    text: "Price"
  }
];

class Orderdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        id: "",
        name: "",
        address: "",
        status: "",
        amount: "",
        items: [],
        owner_messages: [],
        customer_messages: []
      },
      message: ""
    };
  }
  componentDidMount() {
    const payload = {
      order_id: this.props.match.params.order_id
    };
    this.props.getOrderDetail(payload);
  }
  componentWillReceiveProps(nextProps) {
    const {
      id,
      status,
      amount,
      items,
      customer_messages,
      owner_messages
    } = nextProps.order;
    const { name, address } = nextProps.order.customer;
    this.setState({
      order: {
        id,
        name,
        address,
        status,
        amount,
        items,
        owner_messages,
        customer_messages
      },
      message: ""
    });
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleMessage = e => {
    e.preventDefault();
    const payload = {
      order_id: this.state.order.id,
      user_type: this.props.user.type,
      body: this.state.message
    };
    this.props.sendMessage(payload);
  };

  render() {
    return (
      <div>
        {this.props.user.type === "Owner" ? <Sidebar /> : <Navigationbar />}
        <div className="container p-2 order-detail">
          <form>
            <div className="form-group row">
              <label
                htmlFor="orderId"
                className="col-sm-2 col-form-label col-form-label-lg">
                Order ID
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-lg order_detail_input"
                  id="orderId"
                  value={this.state.order.id}
                  readOnly></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="customerName"
                className="col-sm-2 col-form-label col-form-label-lg">
                Customer Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-lg order_detail_input"
                  id="customerName"
                  value={this.state.order.name}
                  readOnly></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="address"
                className="col-sm-2 col-form-label col-form-label-lg">
                Customer Address
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control form-control-lg order_detail_input"
                  id="address"
                  value={this.state.order.address}
                  readOnly></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="amount"
                className="col-sm-2 col-form-label col-form-label-lg">
                Amount
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-lg order_detail_input"
                  id="amount"
                  value={this.state.order.amount}
                  readOnly></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="status"
                className="col-sm-2 col-form-label col-form-label-lg">
                Status
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-lg order_detail_input"
                  id="status"
                  value={this.state.order.status}
                  readOnly></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="items"
                className="col-sm-2 col-form-label col-form-label-lg">
                Items
              </label>
              <div className="col-sm-10">
                <BootstrapTable
                  keyField="name"
                  data={this.state.order.items}
                  columns={columns}
                  bordered={true}
                />
              </div>
            </div>
            {
              this.state.order.owner_messages &&
              this.state.order.owner_messages.length ? (
                <div className="form-group row">
                  <label
                    className=" col-sm-4 col-form-label col-form-label-lg">
                    Customer Messages
                  </label>
                  <div className="col-sm-10">
                    <Accordion>
                      {this.state.order.owner_messages.map(
                        (value, index) => {
                          return (
                            <Card>
                              <Accordion.Toggle
                                as={Card.Header}
                                eventKey={index}>
                                Message {index + 1}
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey={index}>
                                <Card.Body>{value}</Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          );
                        }
                      )}
                    </Accordion>
                  </div>
                </div>
              ) : null}
            {this.state.order.customer_messages &&
              this.state.order.customer_messages.length ? (
              <div className="form-group row">
                <label
                  className=" col-sm-4 col-form-label col-form-label-lg">
                  Owner Messages
                </label>
                <div className="col-sm-10">
                  <Accordion>
                    {this.state.order.customer_messages.map((value, index) => {
                      return (
                        <Card>
                          <Accordion.Toggle as={Card.Header} eventKey={index}>
                            Message {index + 1}
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey={index}>
                            <Card.Body>{value}</Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      );
                    })}
                  </Accordion>
                </div>
              </div>
            ) : null}
            <div className="form-group row">
              <label
                htmlFor="message"
                className="col-sm-4 col-form-label col-form-label-lg">
                Message
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  id="message"
                  placeholder="Message"
                  value={this.state.message}
                  onChange={this.handleChange}
                />
              </div>
              <br></br>
              <div className="col-sm-10">
                <button
                  className="btn btn-primary m-3"
                  onClick={this.handleMessage}>
                  Send Message 
                </button>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
//TODO: Addd message toast on succes, Clear the text area after message send
const mapStateToProps = state => ({
  order: state.order.active,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getOrderDetail: payload => dispatch(ownerActions.getOrderDetail(payload)),
  sendMessage: payload => dispatch(userActions.sendMessage(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orderdetail);
