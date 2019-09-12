import React, { Component } from "react";
import axios from "axios";
import Display from "./display";
import Row from "./row";
import _ from "lodash";
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

  handleChangeState = (display_value, operands, operator) => {
    this.setState({
      display_value,
      operands,
      operator
    });
  }

  handleCalculation = (operands, operator) => {
    return axios
      .post("http://localhost:9000/calculate", {
        operands,
        operator
      }).then(response => {
        if(response.status === 200) {
          this.handleChangeState(response.data, [], []);
        } else {
          this.handleChangeState('err', [], []);
        }
        return;
      }).catch(error => {
        this.handleChangeState('Err', [], []);
        return;
      })
  };

  handleChangeDisplay = value => {
    let { display_value, operands, operator } = this.state;
    if(value === 'C') {
        display_value = "";
        this.handleChangeState(display_value, [], []);
    } else if(_.isFinite(parseInt(value))) {
        display_value += value;
        this.handleChangeState(display_value, operands, operator)
    } else if(["+", "-", "*", "/"].includes(value)) {
        operands.push(display_value);
        operator.push(value);
        display_value = "";
        this.handleChangeState(display_value, operands, operator)
    } else {
      if (display_value !== "") {
        operands.push(display_value);
      }
      this.handleCalculation(operands, operator);
    }
  };

  render() {
    const cardStyle = {
      maxWidth: "18rem",
      marginLeft: "33%",
      marginTop: "4%"
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
