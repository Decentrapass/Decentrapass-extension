/* global chrome */

import "./inPage.scss";
import React, { Component } from "react";

const possibleTypes = [
  "email",
  "text",
  "password",
  "date",
  "datetime-local",
  "month",
  "week",
  "number",
  "tel",
];

export default class FormDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rendered: null,
    };
  }

  componentWillMount() {
    window.addEventListener("mousedown", this.handleClick.bind(this));
  }

  handleClick(e) {
    if (
      e.target.tagName.toLowerCase() === "input" &&
      possibleTypes.includes(e.target.type.toLowerCase())
    ) {
      let rect = e.target.getBoundingClientRect();
      let rectTop = rect.top;
      let rectLeft = rect.left;

      let scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      let height = rect.height * 0.75;
      let properHeight = height > 25 ? height : 25;
      let width = rect.width - properHeight;

      let mt = (rect.height - properHeight) / 2;

      console.log(rect.height, properHeight);
      console.log(rectTop, scrollTop, mt);
      console.log();

      this.setState({
        rendered: (
          <div
            style={{
              width: properHeight,
              height: properHeight,
              top: rectTop + scrollTop + mt,
              left: rectLeft + scrollLeft + width,
            }}
            id="insideField"
          >
            T
          </div>
        ),
      });
    } else {
      this.setState({ render: <></> });
    }
  }

  render() {
    return <>{this.state.rendered}</>;
  }
}
