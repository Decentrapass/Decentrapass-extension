import React, { Component } from "react";

export default class NormalField extends Component {
  constructor(props) {
    super(props);

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
          <span className="field-content">{this.props.fieldValue}</span>
        </div>
        <div className="tools onlyCopy">
          <div className="data-copy" onClick={this.copyData}>
            <p>copy</p>
          </div>
        </div>
      </div>
    );
  }
}
