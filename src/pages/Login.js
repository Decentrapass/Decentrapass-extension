import axios from "axios";
import React, { Component } from "react";
import { FaUnlock } from "react-icons/fa";
import { connect } from "react-redux";
import {
  saveItems,
  changeItem,
  changePage,
  saveWeb3,
  changeAccount,
} from "../state/actions";

import Web3 from "web3";
import { TOKEN_ABI, TOKEN_ADDRESS } from "../web3/web3constants";

import { hash, decrypt } from "../functions/encryption";
import { formatData } from "../functions/format";

const mapDispatchToProps = (dispatch) => {
  return {
    saveItems: (data) => dispatch(saveItems(data)),
    changeItem: (item) => dispatch(changeItem(item)),
    changePage: (page) => dispatch(changePage(page)),
  };
};

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
    account: state.account,
  };
};

export class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    pass: "",
    wrongPass: false, // Manages error message
  };

  async handleSubmit(e) {
    // e.preventDefault();
    // // the salt is unique so each hash is also harder to crack
    // let salt =
    //   "92757284048268437680618097426272165081449213440015539959662593889599895098510086527732870261468815611935921566613676687294748731";
    // let pass = hash(
    //   this.state.pass,
    //   this.state.account, // Both will be obtained from storage (unique per user)
    //   salt // Both will be obtained from storage (unique per user)
    // );
    // let password = await this.props.web3.methods
    //   .password(this.props.account)
    //   .call();
    // let numItems = await this.props.web3.methods
    //   .numObjects(this.props.account)
    //   .call();
    // let dataToSave = await formatData(
    //   numItems,
    //   this.props.web3.methods,
    //   this.props.account
    // );
    // dataToSave = decrypt(dataToSave, pass);
    // if (password === pass) {
    //   this.props.saveItems(dataToSave);
    //   this.props.changeItem(dataToSave[0]);
    //   this.props.changePage("unlocked");
    // } else {
    //   this.setState({ wrongPass: true });
    // }
  }

  render() {
    return (
      <div className="popup">
        <div
          className={"locked-div " + (this.state.wrongPass ? "wrong-pass" : "")}
        >
          <form className="form" onSubmit={this.handleSubmit}>
            <input
              id="unlock-input"
              type="password"
              className="unlock-pass"
              placeholder="Enter your master password"
              onChange={(e) => {
                this.setState({ pass: e.target.value, wrongPass: false });
              }}
              autoFocus
            />
            <button type="submit" className="unlock-button">
              <FaUnlock />
            </button>
          </form>
          <div className="wrong-pass-div">
            <h2>Wrong master password!</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
