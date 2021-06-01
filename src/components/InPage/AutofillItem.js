import React, { Component } from "react";
import { inputTypes } from "./constants";

export default class AutofillItem extends Component {
  constructor(props) {
    super(props);

    this.autofill = this.autofill.bind(this);
  }

  autofill() {
    let e = this.props.e;
    let thisForm;

    let allForms = document.forms;

    for (const form of allForms) {
      if (form.contains(e.target)) {
        thisForm = form;
        break;
      }
    }

    let inputs = thisForm.getElementsByTagName("input");
    let type = this.props.item.type;

    for (const input of inputs) {
      if (inputTypes[type][input.type]) {
        console.log(inputTypes[type][input.type]);
        input.value = this.props.item[inputTypes[type][input.type]];
      }
    }
  }

  render() {
    return (
      <div className="autofill_item" onClick={this.autofill}>
        {this.props.item.title}
      </div>
    );
  }
}
