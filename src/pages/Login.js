/* global chrome */
import React, { Component } from "react";
import { connect } from "react-redux";
import { hash } from "../functions/encryption";

// Web3
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants/web3";

// Functions
import {
  goTo,
  saveAccount,
  saveContract,
  savePassword,
  saveWeb3,
} from "../state/actions";
import { formatAccount } from "../functions/format";

// Components
import Jazzicon from "../components/Jazzicon";

const mapDispatchToProps = (dispatch) => {
  return {
    saveWeb3: (web3) => dispatch(saveWeb3(web3)),
    saveContract: (contract) => dispatch(saveContract(contract)),
    savePassword: (password) => dispatch(savePassword(password)),
    saveAccount: (account) => dispatch(saveAccount(account)),
    goTo: (page) => dispatch(goTo(page)),
  };
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wrongPass: false,
      pass: "",
      account: "",
      rememberMins: 0,
    };

    this.saveToState = this.saveToState.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  // Testing
  deleteData() {
    chrome.storage.local.set({
      account: "",
      password: "",
      lastLogin: "",
    });
  }

  async saveToState(password, account) {
    // Web3
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://ropsten.infura.io/v3/f02ae2e808c14ba0a617aed4725d2734"
      )
    );
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    // Redux saving
    this.props.saveWeb3(web3);
    this.props.saveContract(contract);
    this.props.savePassword(password);
    this.props.saveAccount(account);

    this.props.goTo("unlocked");
  }

  async handleLogin(e) {
    e.preventDefault();

    await chrome.storage.local.get(
      ["account", "password", "lastLogin"],
      async function (items) {
        const web3 = new Web3(
          new Web3.providers.HttpProvider(
            "https://ropsten.infura.io/v3/f02ae2e808c14ba0a617aed4725d2734"
          )
        );
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        const password = await contract.methods.password(items.account).call();

        // If passwords match -> login
        if (password == hash(this.state.password, items.account, 10000)) {
          this.saveToState(
            hash(this.state.password, items.account, 5000),
            items.account
          );
        } else {
          this.setState({ wrongPass: true });
        }
      }.bind(this)
    );
  }

  async componentWillMount() {
    // If his stored session is valid > unlocked
    await chrome.storage.local.get(
      ["account", "password", "lastLogin", "rememberMins"],
      async function (items) {
        this.setState({ account: items.account });

        // If we have their account and password and lastLogin < 1h -> unlocked
        if (
          items.account.length > 0 &&
          items.password.length > 0 &&
          items.lastLogin.length > 0
        ) {
          let diff = (new Date() - new Date(items.lastLogin)) / 1000 / 60;

          // Logged in for user chosen minutes
          if (diff >= 0 && diff < items.rememberMins) {
            this.saveToState(items.password, items.account);
          } else {
            chrome.storage.local.set({
              password: "",
              lastLogin: "",
            });
          }
        } else if (!items.account || items.account.length < 1) {
          this.deleteData();
          this.props.goTo("register");
        }
      }.bind(this)
    );
  }

  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        {/* <button className="p-5 bg-green-200" onClick={this.deleteData}>
          DELETE MY DATA
        </button> */}
        <form
          onSubmit={this.handleLogin}
          className="h-full w-5/6 flex flex-col items-center justify-center"
        >
          <div className="flex h-16 w-full border-2 border-solid bg-white border-gray-300 text-xl lg:text-2xl px-5 py-3 text-gray-700 mb-3 items-center">
            <Jazzicon account={this.state.account} addedClasses="mr-2" />
            {formatAccount(this.state.account, 5)}
          </div>
          <div className="flex h-16 w-full items-center justify-center">
            <input
              type="password"
              className="w-full h-full border-2 border-solid bg-white border-gray-300 text-xl lg:text-2xl px-5 py-3 focus:outline-none focus:border-green-500 rounded-0 lg:rounded-l placeholder-gray-300"
              placeholder="Enter your master password..."
              onChange={(e) => {
                this.setState({ password: e.target.value, wrongPass: false });
              }}
              autoFocus
            />
            <button
              type="submit"
              className="bg-green-500 border-green-500 py-3 px-4 lg:rounded-r focus:outline-none flex items-center justify-center h-full"
            >
              <img
                src={chrome.runtime.getURL("img/logo-nobg.png")}
                className="h-full w-auto"
              />
            </button>
          </div>
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

export default connect(null, mapDispatchToProps)(Login);
