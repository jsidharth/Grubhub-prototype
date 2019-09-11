import React, { Component } from "react";
import Display from "./display";
import Row from "./row";
class Calculator extends Component {
  state = {
    row_num: 4,
    display_value: "",
    operands: [],
    operator: []
  };
  renderRows = () => {
    let rows = [];
    for (let i = 1; i <= this.state.row_num; i++) {
      rows.push(
        <Row key={i} row_id={i} onChangeDisplay={this.handleChangeDisplay} />
      );
    }
    return rows;
  };

  handleChangeDisplay = value => {
    let { display_value, operands, operator } = this.state;
    switch (value) {
      case "C":
        display_value = "";
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        display_value += value;
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        operands.push(display_value);
        operator.push(value);
        display_value = "";
        break;
      case "=":
        if (display_value !== "") {
          operands.push(display_value);
        }
        fetch('http://localhost:9000/').then(res => res.json())
        .then(result => {
            display_value = result.display_value;
            this.setState({
                display_value,
                operands,
                operator
              });
        });
        break;
      default:
        break;
    }
    this.setState({
      display_value,
      operands,
      operator
    });
  };

  render() {
    const cardStyle = {
      maxWidth: "18rem"
    };
    return (
      <main className="container">
        <div className="card border-dark mb-3" style={cardStyle}>
          <div className="card-header">Calculator</div>
          <div className="card-body text-dark">
            <Display key="1" value={this.state.display_value} />
          </div>
          <div>{this.renderRows()}</div>
        </div>
      </main>
    );
  }
}

export default Calculator;
