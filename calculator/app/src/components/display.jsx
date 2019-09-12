import React, { Component } from "react";

class Display extends Component {
  state = {};
  render() {
    return (
      <div className="form-group">
        <div className="col-sm-14">
          <input
            className="form-control col-xs-3"
            id="disabledInput"
            type="text"
            value={this.props.value}
            disabled
          />
        </div>
      </div>
    );
  }
}

export default Display;
