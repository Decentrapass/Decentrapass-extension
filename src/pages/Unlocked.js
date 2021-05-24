import React, { Component } from "react";

import AddItemButton from "../components/AddItemButton";
import DataDisplay from "../components/DataDisplay";
import Recommended from "../components/Recommended";
import SearchBar from "../components/SearchBar";

class Unlocked extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="popup">
        <div className="unlocked-div">
          <div className="top-items">
            <SearchBar />
            <AddItemButton />
          </div>
          <div className="content">
            <Recommended />
            <DataDisplay />
          </div>
        </div>
      </div>
    );
  }
}

export default Unlocked;
