import React, { Component } from "react";

export default class NormalField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed: false, // For password fields
    };

    this.copyData = this.copyData.bind(this);
  }

  copyData() {
    // Copys data to clipboard
    navigator.clipboard.writeText(this.props.fieldValue);
  }

  render() {
    return (
      <div
        className="data-field-div"
        style={this.props.first ? { border: "0 none" } : {}}
      >
        <div className="data-field">
          <span className="field-name">{this.props.fieldName}</span>
          <span
            className="field-content"
            style={
              // Decides if password is hidden
              !this.state.revealed ? { WebkitTextSecurity: "disc" } : {}
            }
          >
            {this.props.fieldValue}
          </span>
        </div>
        <div className="tools">
          <div
            className="data-reveal"
            onClick={() => this.setState({ revealed: !this.state.revealed })}
          >
            <p>reveal</p>
          </div>
          <div className="data-copy" onClick={this.copyData}>
            <p>copy</p>
          </div>
        </div>
      </div>
    );
  }
}
