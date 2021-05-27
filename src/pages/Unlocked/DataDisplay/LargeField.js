import React, { Component } from "react";

import { FaRegCopy, FaCopy } from "react-icons/fa";

// Biggest field displayed (only copy button)
export default class LargeField extends Component {
  constructor(props) {
    super(props);

    this.copyData = this.copyData.bind(this);
    this.state = {
      copyIcon: <FaRegCopy />,
    };
  }

  copyData() {
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
        className="data-field flex w-full items-center border-t border-solid bg-gray-800 border-gray-700 h-40 relative"
        style={this.props.first ? { border: "0 none" } : {}}
      >
        <div className="flex flex-col justify-start h-full w-full py-1 px-4">
          <span className="text-green-600 text-sm leading-none select-none">
            {this.props.fieldName}
          </span>
          <div className="text-base overflow-y-auto">
            {this.props.fieldValue}
          </div>
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
