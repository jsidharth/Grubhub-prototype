import React, { Component } from "react";

class Button extends Component {
  state = {};
  render() {
    return (
      <div className="btn-group">
        <button type="button" className="btn btn-secondary m-3" onClick={() => this.props.onChangeDisplay(this.props.value)}>
          {this.props.value}
        </button>
      </div>
    );
  }
}

export default Button;
