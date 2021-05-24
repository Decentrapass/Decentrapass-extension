import React, { Component } from "react";
import { connect } from "react-redux";
import AddDataField from "../components/DataCreate/AddDataField";
import { IF } from "../components/AddInterfaces";
import { encrypt, hash } from "../functions/encryption";
import { changeItem, changePage, saveItems } from "../state/actions";
import { TYPES_INT } from "../components/constants";
import { formatData, formatItem, formatSend } from "../functions/format";

const mapStateToProps = (state) => {
  return {
    addingItem: state.addingItem,
    account: state.account,
    web3: state.web3,
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePage: (page) => dispatch(changePage(page)),
    changeItem: (item) => dispatch(changeItem(item)),
    saveItems: (data) => dispatch(saveItems(data)),
  };
};

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.stateChanger = this.stateChanger.bind(this);
  }

  stateChanger(name, val) {
    console.log(name, val);
    this.setState({ [name]: val }); // Saves input values on state
  }

  async handleSubmit(fields) {
    // the salt is unique so each hash is also harder to crack
    let salt =
      "92757284048268437680618097426272165081449213440015539959662593889599895098510086527732870261468815611935921566613676687294748731";
    let pass = hash(
      "admin",
      "dmh672@gmail.com", // Both will be obtained from storage (unique per user)
      salt // Both will be obtained from storage (unique per user)
    );

    let type = TYPES_INT[this.props.addingItem];
    let data = [];

    for (const i of Object.keys(fields)) {
      data.push(this.state[i] || ""); // If null set to empty string (avoid errors)
    }

    // Encrypt data > send to backend > redirect user

    if (window.confirm("Are you sure you want to execute this transaction?")) {
      let nextId = await this.props.web3.methods
        .numObjects(this.props.account)
        .call();
      let newItem = formatItem(type, data, this.props.items.length, nextId);
      this.props.saveItems(this.props.items.concat([newItem]));
      let toSend = formatSend(encrypt(data, pass));
      this.props.web3.methods
        .saveObject(type, toSend)
        .send({ from: this.props.account });
      this.props.changePage("unlocked");
    }
  }

  render() {
    var fields = IF[this.props.addingItem];

    return (
      <div className="popup">
        <div className="addItem">
          <div className="data-field-div">
            {Object.keys(fields).map((el, key) => {
              return (
                <AddDataField
                  key={key}
                  fieldLabel={el}
                  fieldName={IF[this.props.addingItem][el][0]}
                  fieldType={IF[this.props.addingItem][el][1]}
                  elementType={this.props.addingItem}
                  stateChanger={this.stateChanger}
                />
              );
            })}
          </div>

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
            <button className="add" onClick={() => this.handleSubmit(fields)}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
