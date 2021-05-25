/* global chrome */

import React, { Component } from "react";
import { connect } from "react-redux";

// Web3
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants/web3";

// Functions
import { hash } from "../functions/encryption";
import {
  goTo,
  saveAccount,
  saveContract,
  savePassword,
  saveWeb3,
} from "../state/actions";

// Redux
const mapDispatchToProps = (dispatch) => {
  return {
    saveWeb3: (web3) => dispatch(saveWeb3(web3)),
    saveContract: (contract) => dispatch(saveContract(contract)),
    savePassword: (password) => dispatch(savePassword(password)),
    saveAccount: (account) => dispatch(saveAccount(account)),
    goTo: (page) => dispatch(goTo(page)),
  };
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: "",
      wrongPass: false,
    };

    this.handleRegister = this.handleRegister.bind(this);
  }

  async handleRegister(e) {
    e.preventDefault();

    // Hashing passwords to compare
    let account = this.state.account;
    let passSave = hash(this.state.password, this.state.account, 5000);
    let passSend = hash(this.state.password, this.state.account, 10000);

    // Generating time to save "cookie"
    // let now = new Date().toString();

    // Testing
    let now = new Date(2021, 4, 25, 13, 0, 0).toString();

    // Web3
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://ropsten.infura.io/v3/f02ae2e808c14ba0a617aed4725d2734"
      )
    );
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    const passContract = await contract.methods.password(account).call();

    // If passwords match
    if (passContract === passSend) {
      chrome.storage.local.set({
        account,
        password: passSave,
        lastLogin: now,
        rememberMins: 0,
      });

      this.props.goTo("login");
    } else {
      this.setState({ wrongPass: true });
    }
  }

  async componentWillMount() {
    // If we already have users data > login
    await chrome.storage.local.get(
      ["account", "password", "lastLogin"],
      async function (items) {
        if (items.account.length > 0) {
          this.props.goTo("login");
        }
      }.bind(this)
    );
  }

  render() {
    return (
      <div className="w-full h-full flex items-center justify-center bg-green-50 ">
        <form
          onSubmit={this.handleRegister}
          className="w-2/3 h-full flex flex-col items-center justify-center"
        >
          <input
            type="text"
            onChange={(e) => this.setState({ account: e.target.value })}
            className="py-5 px-7 text-xl border border-gray-200 w-full"
          />
          <input
            type="password"
            onChange={(e) =>
              this.setState({ password: e.target.value, wrongPass: false })
            }
            className="py-5 px-7 text-xl border border-gray-200 w-full my-4"
          />
          <button type="submit" className="py-5 px-7 bg-green-200 w-full">
            Connect
          </button>
          {this.state.wrongPass && (
            <p className="text-red-500 mt-5 text-lg">
              The password you typed does not match with the one associated with
              your Ethereum address.
            </p>
          )}
        </form>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Register);
