/* global chrome */

import React, { Component } from "react";

export default class LogoButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.calcHeight = this.calcHeight.bind(this);
  }

  calcHeight(e) {
    console.log(e);

    let rect = e.target.getBoundingClientRect();
    let rectTop = rect.top;
    let rectLeft = rect.left;

    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let height = rect.height * 0.5;
    let properHeight = height > 25 ? height : 25;
    let width = rect.width - properHeight;

    let mt = (rect.height - properHeight) / 2;

    this.setState({
      properHeight,
      top: rectTop + scrollTop + mt,
      left: rectLeft + scrollLeft + width - properHeight / 2,
      e,
    });
  }

  componentDidUpdate() {
    const e = this.props.e;
    if (e !== this.state.e) this.calcHeight(e);
  }

  componentDidMount() {
    const e = this.props.e;
    this.calcHeight(e);
  }

  render() {
    return (
      <button
        style={{
          width: this.state.properHeight,
          height: this.state.properHeight,
          top: this.state.top,
          left: this.state.left,
        }}
        id="decentrapass_inpage_button"
        onClick={this.props.open}
      >
        <img src={chrome.runtime.getURL("img/logo-nobg.png")} />
      </button>
    );
  }
}
