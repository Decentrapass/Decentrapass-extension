import React, { Component } from "react";
import { connect } from "react-redux";
import { changeItem } from "../state/actions";
import { LOGO_COLORS } from "./constants";

const mapDispatchToProps = (dispatch) => {
  return {
    changeItem: (itemId) => dispatch(changeItem(itemId)),
  };
};

const mapStateToProps = (state) => {
  return {
    currentItem: state.currentItem,
    items: state.items,
  };
};

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    // Displays preview clicked
    for (const i of this.props.items) {
      if (i.numId === this.props.itemId) {
        this.props.changeItem(i);
        break;
      }
    }
  };

  render() {
    let found = false;
    for (const i of this.props.items)
      if (i.numId == this.props.itemId) found = true;

    if (!found) return <></>;

    let show = this.props.shown;
    // HIDES CARD NUMBER IF ITS A CARD
    if (this.props.type === "card" && this.props.chosenKey === "number") {
      show = (
        <>
          <span className="no-pass-hidden">
            {this.props.shown.substring(0, this.props.shown.length - 4)}
          </span>
          {this.props.shown.substring(this.props.shown.length - 4)}
        </>
      );
    }

    return (
      <div
        className={
          // To show if an item is selected for display
          "recommended-item " +
          (this.props.currentItem &&
          this.props.currentItem.numId === this.props.itemId
            ? "recommended-selected"
            : "")
        }
        onClick={this.handleClick}
        id={"recommendedItem" + this.props.itemId}
      >
        <div
          className="item-img"
          style={{
            // Random color based on first letter
            backgroundColor: LOGO_COLORS[this.props.title.charCodeAt(0) % 26],
          }}
        >
          <span>{this.props.title.charAt(0)}</span>
        </div>
        <div className="item-info">
          <h2>{this.props.title}</h2>
          <span>{show}</span>
        </div>
      </div>
    );
  }
}

const connectedSearchItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchItem);
export default connectedSearchItem;
