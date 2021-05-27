/* global chrome */

import React, { Component } from "react";

// Constants
import {
  DATA_DISPLAY,
  LOGO_COLORS,
  SHOW_DATA,
} from "../../../constants/constants";

// Components
import NormalField from "./NormalField";
import HiddenField from "./HiddenField";
import LargeField from "./LargeField";
import MediumField from "./MediumField";

// Functions
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    items: state.items,
    contract: state.contract,
    account: state.account,
    displayedItems: state.displayedItems,
    currentItem: state.currentItem,
  };
};

class DataDisplay extends Component {
  constructor(props) {
    super(props);

    this.editHandler = this.editHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  editHandler() {
    chrome.tabs.create({
      url:
        "https://decentrapass.github.io/Decentrapass-v1-Interface/#/unlocked/?action=edit?id=" +
        this.props.currentItem.id,
    });
  }

  deleteHandler() {
    chrome.tabs.create({
      url:
        "https://decentrapass.github.io/Decentrapass-v1-Interface/#/unlocked/?action=delete?id=" +
        this.props.currentItem.id,
    });
  }

  render() {
    var displayItem = this.props.currentItem;
    if (displayItem) {
      return (
        <div className="w-3/5 h-full bg-gray-900 flex flex-col justify-between items-center overflow-y-auto">
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center w-full p-4">
              <div
                className="w-12 h-12 flex items-center justify-center font-bold text-3xl uppercase rounded"
                style={{
                  backgroundColor:
                    LOGO_COLORS[displayItem.title.charCodeAt(0) % 26],
                }}
              >
                <span>{displayItem.title.charAt(0)}</span>
              </div>
              <div className="flex flex-col ml-3">
                <h1 className="text-xl">{displayItem.title}</h1>
                {displayItem.url && (
                  <a
                    href={
                      // Manages url formatting
                      displayItem.url.includes("http")
                        ? displayItem.url
                        : "http://" + displayItem.url
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="text-green-500 text-base hover:underline">
                      {displayItem.url.includes("http")
                        ? displayItem.url
                        : "http://" + displayItem.url}
                    </span>
                  </a>
                )}
              </div>
            </div>
            <div className="overflow-y-auto w-full p-4">
              <div className="flex flex-col items-center border border-solid border-gray-700 rounded-xl overflow-hidden">
                {
                  // For every key the object has and we want to display
                  SHOW_DATA[displayItem.type].map((field, key) => {
                    if (DATA_DISPLAY[displayItem.type][field] === "normal")
                      return (
                        <NormalField
                          fieldName={field}
                          fieldValue={displayItem[field]}
                          key={key}
                          first={0 === key}
                        />
                      );
                    else if (DATA_DISPLAY[displayItem.type][field] === "hidden")
                      return (
                        <HiddenField
                          fieldName={field}
                          fieldValue={displayItem[field]}
                          key={key}
                          first={0 === key}
                        />
                      );
                    else if (DATA_DISPLAY[displayItem.type][field] === "large")
                      return (
                        <LargeField
                          fieldName={field}
                          fieldValue={displayItem[field]}
                          key={key}
                          first={0 === key}
                        />
                      );
                    else if (DATA_DISPLAY[displayItem.type][field] === "medium")
                      return (
                        <MediumField
                          fieldName={field}
                          fieldValue={displayItem[field]}
                          key={key}
                          first={0 === key}
                        />
                      );
                    else return <p>Error:{displayItem.type}</p>;
                  })
                }
              </div>
            </div>
          </div>
          <div className="flex w-full p-3 justify-between items-end z-10 text-base">
            {/* EDIT BUTTON */}
            <input
              type="submit"
              value="Edit"
              className="bg-gray-700 py-1 px-3 text-white rounded hover:bg-gray-800 cursor-pointer"
              onClick={this.editHandler}
            />

            {/* DELETE BUTTON */}
            <input
              type="submit"
              value="Delete"
              className="bg-red-700 py-1 px-3 text-white rounded hover:bg-red-800 cursor-pointer"
              onClick={this.deleteHandler}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="w-3/4 h-full bg-gray-900 flex justify-center items-center">
        <div className="w-32 h-32 flex items-center justify-center bg-green-500 rounded-full opacity-40">
          <img
            src={chrome.runtime.getURL("img/logo-nobg.png")}
            className="h-2/3"
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(DataDisplay);
