import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

//This is the page that will prompt the user to enter a numeric code after signing up
export default class ConfirmEmail extends Component {
  state = {
    status: "",
    verficationCode: "",
  };

  handleVerificationCodeChange = (e) => {
    this.setState({ verficationCode: e.target.value });
    console.log(this.state.verficationCode);
  };

  handleResendCode = async () => {
    const { email } = this.props;
    try {
      console.log("Resending to: ", email);
      await Auth.resendSignUp(email);
      console.log("code resent successfully");
    } catch (err) {
      console.log("error resending code: ", err);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = this.props;

    try {
      const r = await Auth.confirmSignUp(email, this.state.verficationCode);
      console.log(r);
      this.setState({ status: "CODE_CONFIRMED" });
    } catch (error) {
      console.log("Error on confirming code", error);
    }
  };

  render() {
    if (this.state.status === "CODE_CONFIRMED") {
      return <Redirect to="/login" />;
    } else if (this.props.email === undefined) {
      return <Redirect to="/sign-up" />;
    }
    return (
      <div className="design-page-styles">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>Email Code Confirmation</h3>
              <div className="form-group">
                <label>Enter code here</label>
                <input
                  value={this.state.verficationCode}
                  onChange={this.handleVerificationCodeChange}
                  type="text"
                  className="form-control"
                  placeholder="6 digit code"
                />
              </div>
              <ul>
                <li className="nav-item">
                  <div
                    className="forgot-password text-left"
                    style={{ cursor: "pointer" }}
                    onClick={this.handleResendCode}
                  >
                    Resend code to email
                  </div>
                </li>
              </ul>
              <button
                onClick={this.handleSubmit}
                type="submit"
                className="btn btn-primary btn-block"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
