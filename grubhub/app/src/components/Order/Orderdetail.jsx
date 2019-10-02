import React, { Component } from "react";
import { connect } from "react-redux";
import { ownerActions } from "../../js/actions";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import './style.css';
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
          id: '',
          name: '',
          address: '',
          status: '',
          amount: '',
          items: []
      }
    };
  }
  componentDidMount() {
    const payload = {
      order_id: this.props.match.params.order_id
    };
    this.props.getOrderDetail(payload);
  }
  componentWillReceiveProps(nextProps) {
    const { id, status, amount, items } = nextProps.order;
    const { name, address } = nextProps.order.customer;
    this.setState({
      order: {
        id,
        name,
        address,
        status,
        amount,
        items
      }
    });
  }
  render() {
    return (
      <div className="container shadow p-3 order-detail">
        <form>
          <div className="form-group row">
            <label htmlFor="orderId" className="col-sm-2 col-form-label col-form-label-lg">
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
            <label htmlFor="customerName" className="col-sm-2 col-form-label col-form-label-lg">
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
            <label htmlFor="address" className="col-sm-2 col-form-label col-form-label-lg">
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
            <label htmlFor="amount" className="col-sm-2 col-form-label col-form-label-lg">
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
            <label htmlFor="status" className="col-sm-2 col-form-label col-form-label-lg">
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
            <label htmlFor="items" className="col-sm-2 col-form-label col-form-label-lg">
              Items
            </label>
          </div>
          <div>
            <BootstrapTable
              keyField="name"
              data={this.state.order.items}
              columns={columns}
              bordered={true}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order.active
});
const mapDispatchToProps = dispatch => ({
  getOrderDetail: payload => dispatch(ownerActions.getOrderDetail(payload))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orderdetail);
