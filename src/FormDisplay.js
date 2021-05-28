/* global chrome */

import "./inPage.scss";
import React, { Component } from "react";
import LogoButton from "./components/InPage/LogoButton";
import AutofillDisplay from "./components/InPage/AutofillDisplay";

// Web3
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constants/web3";
import { formatData } from "./functions/format";
import { decrypt } from "./functions/encryption";

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
      iconShown: false,
      autofillShown: false,
      items: [],
      e: null,
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.saveItems = this.saveItems.bind(this);
    this.displayAutofill = this.displayAutofill.bind(this);
  }

  displayAutofill() {
    this.setState({ autofillShown: !this.state.autofillShown });
  }

  async componentWillMount() {
    window.addEventListener("click", this.handleFocus.bind(this));
    window.addEventListener(
      "blur",
      function () {
        this.setState({ iconShown: false, autofillShown: false });
      }.bind(this)
    );

    // If his stored session is valid > save items
    await chrome.storage.local.get(
      ["account", "password", "lastLogin", "rememberMins"],
      async function (items) {
        // If we have their account and password and lastLogin < saved time
        if (
          items.account.length > 0 &&
          items.password.length > 0 &&
          items.lastLogin.length > 0 &&
          typeof items.rememberMins !== "undefined"
        ) {
          let diff = (new Date() - new Date(items.lastLogin)) / 1000 / 60;

          // Logged in for user chosen minutes
          if (diff >= 0 && diff < items.rememberMins) {
            this.saveItems(items.password, items.account);
          }
        }
      }.bind(this)
    );
  }

  async saveItems(password, account) {
    // Web3
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://ropsten.infura.io/v3/f02ae2e808c14ba0a617aed4725d2734"
      )
    );
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    let numItems = await contract.methods.numObjects(account).call();

    let usersData = await formatData(numItems, contract.methods, account);

    let dataToSave = decrypt(usersData, password);

    this.setState({ items: dataToSave });
  }

  handleFocus(e) {
    if (
      e.target.tagName.toLowerCase() === "input" &&
      possibleTypes.includes(e.target.type.toLowerCase())
    ) {
      this.setState({
        iconShown: true,
        e: e,
      });
    } else if (
      !(
        e.target.id === "decentrapass_inpage_button" ||
        e.target.id === "decentrapass_inpage_autofill"
      )
    ) {
      this.setState({
        iconShown: false,
        autofillShown: false,
      });
    }
  }

  render() {
    return (
      <>
        {this.state.iconShown && (
          <LogoButton e={this.state.e} open={this.displayAutofill} />
        )}
        {this.state.autofillShown && (
          <AutofillDisplay e={this.state.e} items={this.state.items} />
        )}
      </>
    );
  }
}
