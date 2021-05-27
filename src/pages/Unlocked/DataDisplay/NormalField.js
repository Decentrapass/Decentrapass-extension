import React, { Component } from "react";

import { FaRegCopy, FaCopy } from "react-icons/fa";

// Normal field displayed (only copy button)
export default class NormalField extends Component {
  constructor(props) {
    super(props);

    this.copyData = this.copyData.bind(this);

    this.state = {
      copyIcon: <FaRegCopy />,
    };
  }

  copyData(e) {
    // Copies data to clipboard
    this.setState({
      copyIcon: <FaCopy />,
    });
    navigator.clipboard.writeText(this.props.fieldValue);

    setTimeout(
      function () {
        this.setState({
          copyIcon: <FaRegCopy />,
        });
      }.bind(this),
      500
    );
  }

  render() {
    return (
      <div
        className="data-field flex w-full items-center border-t border-gray-700 bg-gray-800 border-gray-300 h-12 relative"
        style={this.props.first ? { border: "0 none" } : {}}
      >
        <div className="flex flex-col justify-center h-full w-full px-4 py-1">
          <span className="text-green-600 text-sm leading-tight select-none">
            {this.props.fieldName}
          </span>
          <span className="text-base leading-tight">
            {this.props.fieldValue}
          </span>
        </div>
        <div className="absolute right-0 hidden w-1/4 h-full justify-end tools">
          <div
            className="text-xl block text-green-500 w-1/2 flex items-center justify-center h-full bg-gray-800 hover:text-green-100 cursor-pointer"
            onClick={this.copyData}
          >
            <p className="flex items-center justify-center gap-1">
              {this.state.copyIcon}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
