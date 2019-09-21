import React, { Component } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
const products = [
  { id: 1, name: 'hi', price: '3', status: 'completed' },
  { id: 2, name: 'hello', price: '5', status: 'cooking' },
];
const orderStatus = [
  {
    name: 'Cooking',
    value: 'cooking',
  },
  {
    name: 'Completed',
    value: 'completed',
  },
];
function dropdownFormatter(cell, row) {
  return (
    <select value={row.status}>
      {orderStatus.map(status => (
        <option value={status.value}>{status.name}</option>
      ))}
    </select>
  );
}
const columns = [
  {
    dataField: 'id',
    text: 'Product ID',
  },
  {
    dataField: 'name',
    text: 'Product Name',
  },
  {
    dataField: 'price',
    text: 'Product Price',
  },
  {
    dataField: 'status',
    text: 'Product Price',
    formatter: dropdownFormatter,
  },
];
export default class Order extends Component {
  render() {
    return <BootstrapTable keyField="id" data={products} columns={columns} />;
  }
}
