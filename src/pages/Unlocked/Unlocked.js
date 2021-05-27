/* global chrome */

import React, { Component } from "react";
import { connect } from "react-redux";
import AddItemButton from "../../components/Popups/AddItemButton";

// Icons
import { IoSettingsSharp } from "react-icons/io5";

// Functions
import { decrypt } from "../../functions/encryption";
import { formatData } from "../../functions/format";
import { changeItem, goTo, saveItems } from "../../state/actions";
import DataDisplay from "./DataDisplay/DataDisplay";
import Recommended from "./Recommended/Recommended";
import SearchBar from "./SearchBar";

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
  async componentWillMount() {
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
      <div className="flex flex-col w-full h-full text-white">
        <div className="flex w-full border-b border-gray-700 flex items-center">
          <SearchBar />
          <AddItemButton />
          <div className="h-full flex items-center justify-center pr-3 relative bg-gray-900">
            <div
              className="w-12 h-12 text-3xl text-gray-500 rounded-full bg-gray-900 border border-gray-700 transform hover:scale-105 hover:text-white hover:border-white transition-all flex items-center justify-center focus:bg-gray-800 focus:outline-none cursor-pointer"
              onClick={() => this.props.goTo("settings")}
            >
              <IoSettingsSharp />
            </div>
          </div>
        </div>
        <div className="flex h-full w-full relative overflow-hidden">
          <Recommended />
          <DataDisplay />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Unlocked);
