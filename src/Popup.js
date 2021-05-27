/* global chrome */

import { Component } from "react";
import { connect } from "react-redux";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Unlocked from "./pages/Unlocked/Unlocked";
import Settings from "./pages/Settings/Settings";

const mapStateToProps = (state) => {
  return {
    page: state.page,
  };
};

export class Popup extends Component {
  constructor(props) {
    super(props);
  }

  getPage(page) {
    console.log(page);

    switch (page) {
      case "register":
        return <Register />;
      case "login":
        return <Login />;
      case "unlocked":
        return <Unlocked />;
      case "settings":
        return <Settings />;
      default:
        return <>Error</>;
    }
  }

  render() {
    return (
      <div style={{ width: "650px", height: "400px" }}>
        {this.getPage(this.props.page)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Popup);
