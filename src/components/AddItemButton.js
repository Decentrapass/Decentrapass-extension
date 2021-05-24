import React, { Component } from "react";
import { IoMdAdd } from "react-icons/io";
import { connect } from "react-redux";
import { addItem, changePage } from "../state/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (type) => dispatch(addItem(type)),
    changePage: (page) => dispatch(changePage(page)),
  };
};

class AddItemButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  addItemClick = (e) => {
    let selectedItem = e.target.innerText;
    this.setState({ open: !this.state.open });

    // Handles changing the creation interface
    switch (selectedItem) {
      case "Login":
        this.props.addItem("login");
        break;
      case "Credit Card":
        this.props.addItem("card");
        break;
      case "Secure Note":
        this.props.addItem("note");
        break;
      default:
        break;
    }

    this.props.changePage("adding");
  };

  render() {
    return (
      <div className="addItemButton">
        <button onClick={() => this.setState({ open: !this.state.open })}>
          <IoMdAdd />
        </button>
        <div className="menu" style={this.state.open ? { left: "0" } : {}}>
          <div
            className="space"
            onClick={() => this.setState({ open: !this.state.open })}
          ></div>
          <div
            className="options"
            style={this.state.open ? { transform: "translateX(0)" } : {}}
          >
            <ul>
              <li onClick={this.addItemClick}>
                Login
                <span>
                  <IoMdAdd />
                </span>
              </li>
              <li onClick={this.addItemClick}>
                Credit Card
                <span>
                  <IoMdAdd />
                </span>
              </li>
              <li onClick={this.addItemClick}>
                Secure Note
                <span>
                  <IoMdAdd />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(AddItemButton);
