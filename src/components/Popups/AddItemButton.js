/* global chrome */

import React, { Component } from "react";

// ICONS
import { FaUserAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { AiFillCreditCard } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
class AddItemButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      redirect: null,
    };

    this.wrapperRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  // Listen to clicks to close menu
  componentDidMount() {
    window.addEventListener("mousedown", this.handleClick.bind(this));
  }

  // Stop listening to clicks when unmounted
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick.bind(this));
  }

  // Handles closing the menu when clicking outside
  handleClick(e) {
    if (
      this.state.open &&
      this.wrapperRef &&
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(e.target)
    ) {
      this.setState({ open: false });
    }
  }

  // Handles changing state depending on the add button clicked
  addItemClick = (e) => {
    let selectedItem = e.target.innerText;
    this.setState({ open: !this.state.open });
    let itemType;

    // Handles changing the creation interface
    switch (selectedItem) {
      case "Login":
        itemType = "login";
        break;
      case "Credit Card":
        itemType = "card";
        break;
      case "Secure Note":
        itemType = "note";
        break;
      default:
        break;
    }

    chrome.tabs.create({
      url:
        "https://decentrapass.github.io/Decentrapass-v1-Interface/#/unlocked/?action=add?type=" +
        itemType,
    });
  };

  render() {
    return (
      <div className="h-full flex items-center justify-center pr-3 relative bg-gray-900">
        {/* Add item button */}
        <button
          className="w-12 h-12 text-3xl text-gray-500 rounded-full bg-gray-900 border border-gray-700 transform hover:scale-105 focus:scale-105 transition-all flex items-center justify-center focus:bg-gray-800 outline-none hover:outline-none focus:outline-none focus:text-white focus:border-white hover:text-white hover:border-white"
          onClick={() => this.setState({ open: true })}
        >
          <IoMdAdd />
        </button>

        {/* Add item popup */}
        <div
          className="padding-3 bg-gray-800 text-gray-300 border rounded-lg border-gray-600 border-solid overflow-hidden w-52 absolute right-0 top-full z-30 text-base shadow-2xl"
          style={this.state.open ? { display: "block" } : { display: "none" }}
          ref={this.wrapperRef}
        >
          <ul>
            <li
              onClick={this.addItemClick}
              className="flex items-center w-full p-3 hover:bg-gray-900 hover:text-white cursor-pointer"
            >
              <span className="mr-2">
                <FaUserAlt />
              </span>
              Login
            </li>
            <li
              onClick={this.addItemClick}
              className="flex items-center w-full p-3 hover:bg-gray-900 hover:text-white cursor-pointer"
            >
              <span className="mr-2">
                <AiFillCreditCard />
              </span>
              Credit Card
            </li>
            <li
              onClick={this.addItemClick}
              className="flex items-center w-full p-3 hover:bg-gray-900 hover:text-white cursor-pointer"
            >
              <span className="mr-2">
                <CgNotes />
              </span>
              Secure Note
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AddItemButton;
