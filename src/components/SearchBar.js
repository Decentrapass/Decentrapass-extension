import React, { Component } from "react";
import { connect } from "react-redux";
import { filterItems, changeItem } from "../state/actions";

const mapStateToProps = (state) => {
  return { items: state.items };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeItem: (item) => dispatch(changeItem(item)),
    filterItems: (items) => dispatch(filterItems(items)),
  };
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  handleType = (e) => {
    // Filters for searching
    var newItems = this.props.items.filter((el) => {
      let val = e.target.value.toLowerCase();
      if (el.type === "login")
        return (
          el["title"].toLowerCase().includes(val) ||
          el["username"].toLowerCase().includes(val) ||
          el["email"].toLowerCase().includes(val)
        );
      else if (el.type === "card")
        return (
          el["title"].toLowerCase().includes(val) ||
          el["name"].toLowerCase().includes(val) ||
          el["cardType"].toLowerCase().includes(val)
        );
      else if (el.type === "note")
        return (
          el["note"].toLowerCase().includes(val) ||
          el["title"].toLowerCase().includes(val)
        );
    });

    // If search bar is empty display all
    if (e.target.value === "") newItems = this.props.items;

    this.props.filterItems(newItems);
    this.props.changeItem(newItems[0] || null);
  };

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          onChange={(e) => this.handleType(e)}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
