import React, { Component } from "react";
import { connect } from "react-redux";
import { changeItem } from "../../../state/actions";
import { LOGO_COLORS } from "../../../constants/constants";

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

    if (this.props.currentItem) {
      return (
        <div
          className={
            // To show if an item is selected for display
            "p-2 flex " +
            (this.props.currentItem &&
            this.props.currentItem.numId === this.props.itemId
              ? "bg-green-500"
              : "")
          }
          onClick={this.handleClick}
          id={"recommendedItem" + this.props.itemId}
        >
          <div
            className="w-10 h-10 flex items-center justify-center font-bold text-xl uppercase rounded"
            style={{
              // Random color based on first letter
              backgroundColor: LOGO_COLORS[this.props.title.charCodeAt(0) % 26],
            }}
          >
            <span>{this.props.title.charAt(0)}</span>
          </div>
          <div className="flex flex-col justify-center ml-2">
            <h2
              className={
                "text-base " +
                (this.props.currentItem &&
                this.props.currentItem.numId === this.props.itemId
                  ? "text-black"
                  : "text-white")
              }
            >
              {this.props.title}
            </h2>
            <span
              className={
                "text-sm leading-none " +
                (this.props.currentItem &&
                this.props.currentItem.numId === this.props.itemId
                  ? "text-gray-800"
                  : "text-gray-400")
              }
            >
              {show}
            </span>
          </div>
        </div>
      );
    } else return <></>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchItem);
