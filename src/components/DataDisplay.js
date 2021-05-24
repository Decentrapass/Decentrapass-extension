import React, { Component } from "react";
import { DATA_DISPLAY, LOGO_COLORS, SHOW_DATA } from "./constants";

import NormalField from "./DataDisplay/NormalField";
import HiddenField from "./DataDisplay/HiddenField";
import LargeField from "./DataDisplay/LargeField";
import MediumField from "./DataDisplay/MediumField";
import { connect } from "react-redux";
import {
  changeItem,
  changePage,
  filterItems,
  saveItems,
} from "../state/actions";

const mapStateToProps = (state) => {
  return {
    items: state.items,
    web3: state.web3,
    account: state.account,
    displayedItems: state.displayedItems,
    currentItem: state.currentItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveItems: (data) => dispatch(saveItems(data)),
    changePage: (page) => dispatch(changePage(page)),
    changeItem: (item) => dispatch(changeItem(item)),
    filterItems: (items) => dispatch(filterItems(items)),
  };
};

class DataDisplay extends Component {
  constructor(props) {
    super(props);
  }

  editHandler() {
    this.props.changePage("edit");
  }

  async deleteHandler() {
    let call = await this.props.web3.methods
      .deleteObject(this.props.currentItem.id)
      .send({ from: this.props.account });

    console.log(call);

    let newItems = this.props.items;
    let delPos;

    for (let i = 0; i < this.props.items.length; i++)
      if (this.props.items[i].numId == this.props.currentItem.numId) delPos = i;

    newItems.splice(delPos, 1);
    this.props.saveItems(newItems);
    this.props.changeItem(newItems[0]);
  }

  render() {
    var displayItem = this.props.currentItem;
    if (displayItem)
      return (
        <div className="data">
          <div className="primary">
            <div
              className="item-img"
              style={{
                backgroundColor:
                  LOGO_COLORS[displayItem.title.charCodeAt(0) % 26],
              }}
            >
              <span>{displayItem.title.charAt(0)}</span>
            </div>
            <div className="primary-data">
              <h1>{displayItem.title}</h1>
              {displayItem.url && (
                <a
                  href={
                    displayItem.url.includes("http")
                      ? displayItem.url
                      : "http://" + displayItem.url
                  }
                  target="_blank"
                >
                  <span>{displayItem.url}</span>
                </a>
              )}
            </div>
          </div>
          <div className="secondary">
            <div className="secondary-data">
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
                })
              }
            </div>
          </div>
          <div className="no-pass-buttons">
            <input
              type="submit"
              value="Edit"
              className="normal"
              onClick={() => this.editHandler()}
            />
            <input
              type="submit"
              value="Delete"
              className="cancel"
              onClick={() => this.deleteHandler()}
            />
          </div>
        </div>
      );
    return <div className="data"></div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataDisplay);
