/* global chrome */

import React, { Component } from "react";

// Function
import { connect } from "react-redux";
import { goTo } from "../../state/actions";

// Icons
import { IoChevronBack } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";

const mapDispatchToProps = (dispatch) => {
  return {
    goTo: (page) => dispatch(goTo(page)),
  };
};

/*-----------------SETTINGS------------------*/
// 1) Lock after X minutes
// 2) Check for easy passwords
// 3) Show autofill recommendations
// 4) Open with shorcut Ctrl+Shift+X
/*-------------------------------------------*/

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rememberMins: 0,
      autofill: true,
      command: "",
    };

    this.changeMins = this.changeMins.bind(this);
    this.logout = this.logout.bind(this);
    this.forget = this.forget.bind(this);
    this.changeAutofill = this.changeAutofill.bind(this);
    this.changePassCheck = this.changePassCheck.bind(this);
  }

  changeMins(e) {
    this.setState({ rememberMins: parseInt(e.target.value) }, () => {
      chrome.storage.local.set({
        rememberMins: parseInt(this.state.rememberMins),
      });
    });
  }

  async logout() {
    await chrome.storage.local.set({ password: "", lastLogin: "" });
    this.props.goTo("login");
  }

  async forget() {
    await chrome.storage.local.set({
      password: "",
      lastLogin: "",
      account: "",
      rememberMins: 0,
      autofill: true,
      checkPasswords: true,
    });
    this.props.goTo("register");
  }

  async componentWillMount() {
    await chrome.storage.local.get(
      ["rememberMins", "autofill"],
      async function (items) {
        this.setState({
          rememberMins: items.rememberMins,
          autofill: items.autofill,
          checkPasswords: items.checkPasswords,
        });
      }.bind(this)
    );

    await chrome.commands.getAll(
      function (cmds) {
        this.setState({ command: cmds[0].shortcut });
      }.bind(this)
    );
  }

  async changeAutofill() {
    this.setState({ autofill: !this.state.autofill });

    await chrome.storage.local.get(
      ["autofill"],
      async function (items) {
        await chrome.storage.local.set({
          autofill: !items.autofill,
        });
      }.bind(this)
    );
  }

  async changePassCheck() {
    this.setState({ checkPasswords: !this.state.checkPasswords });

    await chrome.storage.local.get(
      ["autofill"],
      async function (items) {
        await chrome.storage.local.set({
          checkPasswords: !items.checkPasswords,
        });
      }.bind(this)
    );
  }

  editShorcut() {
    chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
  }

  render() {
    return (
      <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center relative">
        {/* Back button */}
        <div className="absolute top-0 left-0 w-full p-4 z-30 bg-gray-900">
          <button
            className="flex items-center justify-center text-green-500 text-lg focus:outline-none"
            onClick={() => this.props.goTo("unlocked")}
          >
            <IoChevronBack />
            <span className="ml-1">Back</span>
          </button>
        </div>

        {/* Settings */}
        <div className="flex flex-col items-center justify-start w-full overflow-y-auto mt-16 pb-10">
          {/* Keep me logged for X option */}
          <div className="flex items-center justify-between text-white text-lg w-2/3">
            <span>Keep me logged in for</span>
            <div className="h-10 rounded bg-gray-800 text-lg flex items-center px-3 ml-2 justify-center w-1/3">
              <input
                className="text-white bg-gray-800 focus:outline-none text-right w-12"
                type="number"
                value={this.state.rememberMins}
                onChange={this.changeMins}
                min={0}
                max={60}
              />
              <span className="text-gray-400">
                minute{this.state.rememberMins != 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Open with command */}
          <div className="flex items-center justify-between text-white text-lg w-2/3 mt-5">
            <label htmlFor="">Open extension with shorcut</label>
            <div
              className="text-gray-300 hover:text-green-500 cursor-pointer flex items-center justify-center gap-1"
              onClick={this.editShorcut}
            >
              <span>{this.state.command}</span>
              <MdModeEdit />
            </div>
          </div>

          <div className="w-2/3 h-px border-t-2 border-solid border-gray-500 my-6"></div>

          {/* Autofill recommendations */}
          <div className="flex items-center justify-between text-white text-lg w-2/3">
            <label htmlFor="">Show autofill recommendations</label>
            <button
              className={
                "h-7 w-12 rounded-full focus:outline-none relative transition-colors " +
                (this.state.autofill ? "bg-green-500" : "bg-gray-500")
              }
              onClick={this.changeAutofill}
            >
              <div
                className="h-6 w-6 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2"
                style={
                  this.state.autofill
                    ? {
                        transform: "translate(90%,-50%)",
                        transition: "transform 100ms linear",
                      }
                    : {
                        transform: "translate(10%,-50%)",
                        transition: "transform 100ms linear",
                      }
                }
              ></div>
            </button>
          </div>

          {/* Check password difficulty */}
          <div className="flex items-center justify-between text-white text-lg w-2/3 mt-5">
            <label htmlFor="">Check for insecure passwords</label>
            <button
              className={
                "h-7 w-12 rounded-full focus:outline-none relative transition-colors " +
                (this.state.checkPasswords ? "bg-green-500" : "bg-gray-500")
              }
              onClick={this.changePassCheck}
            >
              <div
                className="h-6 w-6 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2"
                style={
                  this.state.checkPasswords
                    ? {
                        transform: "translate(90%,-50%)",
                        transition: "transform 100ms linear",
                      }
                    : {
                        transform: "translate(10%,-50%)",
                        transition: "transform 100ms linear",
                      }
                }
              ></div>
            </button>
          </div>

          <div className="w-2/3 h-px border-t-2 border-solid border-gray-500 my-6"></div>

          {/* Lock decentrapass */}
          <button
            onClick={this.logout}
            className="w-2/3 rounded border border-red-500 text-base text-red-500 px-5 py-3 flex items-center justify-center focus:outline-none hover:border-red-700 hover:text-red-700"
          >
            Lock Decentrapass
          </button>

          {/* Delete all data & lock */}
          <button
            onClick={this.forget}
            className="w-2/3 rounded border border-red-500 text-base mt-5 text-red-500 px-5 py-3 flex items-center justify-center focus:outline-none hover:border-red-700 hover:text-red-700"
          >
            Forget my account
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Settings);
