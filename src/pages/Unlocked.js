/* global chrome */

import React, { Component } from "react";
import { connect } from "react-redux";

// Functions
import { decrypt } from "../functions/encryption";
import { formatData } from "../functions/format";
import { goTo, saveItems } from "../state/actions";

const mapStateToProps = (state) => {
  return {
    account: state.account,
    password: state.password,
    contract: state.contract,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goTo: (page) => dispatch(goTo(page)),
    saveItems: (items) => dispatch(saveItems(items)),
    changeItem: (item) => dispatch(changeItem(item)),
  };
};

class Unlocked extends Component {
  // Testing
  deleteData() {
    chrome.storage.local.set({
      account: "",
      password: "",
      lastLogin: "",
      rememberMins: 0,
    });
  }

  async componentDidMount() {
    if (!this.props.account || !this.props.password || !this.props.contract) {
      this.props.goTo("login");
    } else {
      let numItems = await this.props.contract.methods
        .numObjects(this.props.account)
        .call();

      let usersData = await formatData(
        numItems,
        this.props.contract.methods,
        this.props.account
      );

      let dataToSave = decrypt(usersData, this.props.password);

      this.props.saveItems(dataToSave);
      this.props.changeItem(dataToSave[0]);
    }
  }

  render() {
    return (
      <div>
        <button className="p-5 bg-green-200" onClick={this.deleteData}>
          DELETE MY DATA
        </button>
        <p>{this.props.account}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Unlocked);
