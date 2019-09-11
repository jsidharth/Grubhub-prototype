import React, { Component } from "react";
import Button from './button'

class Row extends Component {
  state = {
    calculator_rows: [
        {
          row_num: 1,
          labels: ["7", "8", "9", "+"]
        },
        {
          row_num: 2,
          labels: ["4", "5", "6", "-"]
        },
        {
          row_num: 3,
          labels: ["1", "2", "3", "*"]
        },
        {
          row_num: 4,
          labels: ["C", "0", "=", "/"]
        }
      ]
  };
  renderRowButtons = () => {
      const buttons = [];
      this.state.calculator_rows.find(row => row.row_num === this.props.row_id).labels.forEach(label => {
          buttons.push(<div>
              <Button key={label} value = {label} onChangeDisplay = {this.props.onChangeDisplay}/>
          </div>)
      });
      return buttons;
  }
  render() {
    return (
      <div className="d-flex flex-row bd-highlight mb-3">
          {this.renderRowButtons()}
      </div>
    );
  }
}

export default Row;
