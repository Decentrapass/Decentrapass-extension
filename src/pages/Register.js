import React, { Component } from "react";
import { FaUnlock } from "react-icons/fa";
import { connect } from "react-redux";

import { hash } from "../functions/encryption";
import { changePage } from "../state/actions";

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePage: (page) => dispatch(changePage(page)),
  };
};

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  format(acc) {
    let shortAcc =
      acc.substring(0, 6) + "..." + acc.substring(acc.length - 4, acc.length);

    return shortAcc;
  }

  async handleSubmit(e) {
    e.preventDefault();

    let pass = hash(this.state.pass, this.props.account);
    await this.props.web3.methods
      .setPass(pass)
      .send({ from: this.props.account });

    this.props.changePage("unlocked");
  }

  render() {
    return (
      <div className="popup">
        <div className="locked-div">
          <div className="connected-account">
            Account: {this.format(this.props.account)}
          </div>
          <form className="form" onSubmit={this.handleSubmit}>
            <input
              id="unlock-input"
              type="password"
              className="unlock-pass"
              placeholder="Enter a password for your new account"
              onChange={(e) => {
                this.setState({ pass: e.target.value });
              }}
              name="register"
              autoFocus
            />
            <button type="submit" className="unlock-button">
              <FaUnlock />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
