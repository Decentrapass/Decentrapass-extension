/* global chrome */

import { Component } from "react";
import { connect } from "react-redux";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Unlocked from "./pages/Unlocked";

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
    switch (page) {
      case "register":
        return <Register />;
      case "login":
        return <Login />;
      case "unlocked":
        return <Unlocked />;
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
