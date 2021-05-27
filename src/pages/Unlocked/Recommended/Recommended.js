import React, { Component } from "react";

// Functions
import { connect } from "react-redux";

// Constants
import { SHOW_SEARCH } from "../../../constants/constants";

// Components
import SearchItem from "./SearchItem";

const mapStateToProps = (state) => {
  return { displayedItems: state.displayedItems };
};

class Recommended extends Component {
  render() {
    let displayedItems = this.props.displayedItems || [];

    return (
      <div className="flex flex-col h-full w-2/5 border-r border-solid border-gray-700 bg-gray-900">
        <div className="w-full h-full cursor-pointer overflow-y-auto pt-3">
          {displayedItems.map((item, key) => {
            // Choosing the most relevant info to show in the recommended section
            let chosenKey = "";
            let shown = "";

            for (const id of SHOW_SEARCH[item.type]) {
              if (item[id] !== "") {
                shown = item[id];
                chosenKey = id;
                break;
              }
            }

            return (
              <SearchItem
                key={key}
                itemId={item.numId}
                title={item.title}
                shown={shown}
                type={item.type}
                chosenKey={chosenKey}
                changeView={this.props.changeView}
              />
            );
          })}
          {displayedItems.length < 1 && (
            <div className="px-4 py-1 text-gray-300 w-full text-base">
              No results matching search
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Recommended);
