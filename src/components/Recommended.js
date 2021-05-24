import React, { Component } from "react";
import { connect } from "react-redux";
import { SHOW_SEARCH } from "./constants";
import SearchItem from "./SearchItem";

const mapStateToProps = (state) => {
  return { displayedItems: state.displayedItems };
};

class Recommended extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="recommended">
        {this.props.displayedItems.map((item, key) => {
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
            />
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Recommended);
