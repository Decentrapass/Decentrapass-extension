/* global chrome */
import React, { Component } from "react";
import { connect } from "react-redux";
import Web3 from "web3";

import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unlocked from "./pages/Unlocked";

import { changeAccount, saveWeb3 } from "./state/actions";
import { TOKEN_ABI, TOKEN_ADDRESS } from "./web3/web3constants";

const mapStateToProps = (state) => {
  return { page: state.page };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAccount: (acc) => dispatch(changeAccount(acc)),
    saveWeb3: (acc) => dispatch(saveWeb3(acc)),
  };
};

export class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: false,
    };
  }

  async componentDidMount() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

    const accounts = await web3.eth.getAccounts();
    const Token = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);

    let password = await Token.methods.password(accounts[0]).call();

    this.setState({ password: password !== "" });

    this.props.changeAccount(accounts[0]);
    this.props.saveWeb3(Token);
  }

  render() {
    switch (this.props.page) {
      case "unlocked":
        return <Unlocked />;
      case "adding":
        return <AddItem />;
      case "edit":
        return <EditItem />;
      default:
        if (this.state.password) return <Login />;
        else return <Register />;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
