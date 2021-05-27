/* global chrome */

import React, { Component } from "react";
import { connect } from "react-redux";

// Web3
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../constants/web3";

// Functions
import { hash } from "../../functions/encryption";
import {
  goTo,
  saveAccount,
  saveContract,
  savePassword,
  saveWeb3,
} from "../../state/actions";

// Icons
import { FaLink, FaLock } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";

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
      animDone: false,
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
    let now = new Date().toString();

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
        autofill: true,
        checkPasswords: true,
      });

      this.props.saveWeb3(web3);
      this.props.saveContract(contract);
      this.props.savePassword(passSave);
      this.props.saveAccount(account);

      this.props.goTo("unlocked");
    } else {
      this.setState({ wrongPass: true });
    }
  }

  async componentWillMount() {
    // If we already have users data > login
    await chrome.storage.local.get(
      ["account"],
      async function (items) {
        if (items.account && items.account.length > 0) {
          this.props.goTo("login");
        }
      }.bind(this)
    );
  }

  async componentDidMount() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    this.setState({ animStarted: true });
    await new Promise((resolve) => setTimeout(resolve, 300));

    this.setState({ animStarted: false, animDone: true });
  }

  render() {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 ">
        <div
          className="w-full h-full absolute items-center justify-center"
          style={
            !this.state.animDone ? { display: "flex" } : { display: "none" }
          }
        >
          <div
            className="p-10 rounded-full bg-green-500 flex items-center justify-center h-52 w-52"
            style={
              this.state.animStarted
                ? { opacity: "0", transition: "opacity 300ms" }
                : { opacity: "1" }
            }
          >
            <img
              src={chrome.runtime.getURL("img/logo-nobg.png")}
              className="h-full"
            />
          </div>
        </div>
        <form
          onSubmit={this.handleRegister}
          className="w-2/3 h-full flex flex-col items-center justify-center transition-opacity delay-200"
          style={this.state.animDone ? { opacity: "1" } : { opacity: "0" }}
        >
          <div className="w-full relative">
            <IoWalletOutline className="text-gray-300 absolute text-2xl top-1/2 left-7 transform -translate-y-1/2 -translate-x-1/2" />
            <input
              type="text"
              onChange={(e) => this.setState({ account: e.target.value })}
              className="w-full h-16 border-2 border-solid bg-gray-800 border-gray-700 text-xl pl-12 pr-5 focus:border-green-500 focus:outline-none rounded-0 placeholder-gray-400 font-sans text-gray-100"
              placeholder="Ethereum Address"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Ethereum Address")}
              id="accountInput"
            />
          </div>
          <div className="w-full relative mt-3">
            <FaLock className="text-gray-300 absolute text-2xl top-1/2 left-7 transform -translate-y-1/2 -translate-x-1/2" />
            <input
              type="password"
              onChange={(e) =>
                this.setState({ password: e.target.value, wrongPass: false })
              }
              className="w-full h-16 border-2 border-solid bg-gray-800 border-gray-700 text-xl pl-12 pr-5 focus:border-green-500 focus:outline-none rounded-0 placeholder-gray-400 font-sans text-gray-100"
              placeholder="Password"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Password")}
            />
          </div>
          <button
            type="submit"
            className="text-xl py-5 px-7 bg-green-500 w-full mt-3 text-white font-black hover:bg-green-700 hover:text-gray-300 flex items-center justify-center focus:outline-none"
          >
            <span className="leading-none">Connect</span>
            <FaLink className="text-lg ml-1" />
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
