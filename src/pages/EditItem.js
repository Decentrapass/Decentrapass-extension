import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import AddDataField from "../components/DataCreate/AddDataField";
import { IF } from "../components/AddInterfaces";
import { decrypt, encrypt, hash } from "../functions/encryption";
import { changeItem, changePage, saveItems } from "../state/actions";
import { TYPES_INT } from "../components/constants";

const mapStateToProps = (state) => {
  return {
    currentItem: state.currentItem,
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePage: (page) => dispatch(changePage(page)),
    changeItem: (item) => dispatch(changeItem(item)),
    saveItems: (items) => dispatch(saveItems(items)),
  };
};

class EditItem extends Component {
  state = {
    fields: null,
  };

  constructor(props) {
    super(props);

    this.stateChanger = this.stateChanger.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var fields = IF[this.props.currentItem.type];
    var fieldsHtml = Object.keys(fields).map((el) => {
      return (
        <AddDataField
          fieldLabel={el}
          fieldName={IF[this.props.currentItem.type][el][0]}
          fieldType={IF[this.props.currentItem.type][el][1]}
          elementType={this.props.currentItem.type}
          stateChanger={this.stateChanger}
          filledWith={this.props.currentItem[el]}
        />
      );
    });

    this.setState({ fields: fieldsHtml });
  }

  stateChanger(name, val) {
    this.setState({ [name]: val }); // Saves input values on state
  }

  handleSubmit() {
    var fields = IF[this.props.currentItem.type];
    let salt =
      "92757284048268437680618097426272165081449213440015539959662593889599895098510086527732870261468815611935921566613676687294748731";
    let pass = hash(
      "admin",
      "dmh672@gmail.com", // Both will be obtained from storage (unique per user)
      salt // Both will be obtained from storage (unique per user)
    );

    let type = this.props.currentItem.type;
    let data = [];

    for (const i of Object.keys(fields)) {
      data.push(this.state[i] || ""); // If null set to empty string (avoid errors)
    }

    // Encrypt data > send to backend > redirect user
    data = encrypt(data, pass);

    let toSend = JSON.stringify(data);
    toSend = toSend.substring(1, toSend.length - 1).replace(/"/g, "'");

    if (
      window.confirm("Are you sure you want to save this edited " + type + "?")
    ) {
      this.props.web3.methods
        .saveObject(TYPES_INT[type], toSend)
        .send({ from: this.props.account });
      this.props.changePage("unlocked");
    }
  }

  render() {
    return (
      <div className="popup">
        <div className="addItem">
          <div className="data-field-div">{this.state.fields}</div>
          <div
            className="no-pass-buttons"
            style={{ justifyContent: "flex-end" }}
          >
            <button
              className="cancel"
              onClick={() => this.props.changePage("unlocked")}
            >
              Cancel
            </button>
            <button className="add" onClick={this.handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
