import React, { Component } from "react";

export default class AutofillDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.calcHeight = this.calcHeight.bind(this);
  }

  calcHeight(e) {
    let rect = e.target.getBoundingClientRect();
    let rectTop = rect.top;
    let rectLeft = rect.left;

    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let width = rect.width;
    let top = rect.height;

    this.setState({
      width,
      e,
      top: rectTop + scrollTop + top,
      left: rectLeft + scrollLeft,
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
      <div
        style={{
          width: this.state.width,
          top: this.state.top,
          left: this.state.left,
        }}
        id="decentrapass_inpage_autofill"
      >
        {this.props.items.map((item, key) => {
          return <div className="autofill_item">{item.title}</div>;
        })}
      </div>
    );
  }
}
