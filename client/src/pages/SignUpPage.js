import React, { Component } from "react";
import { Link } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import ConfirmEmail from "../components/ConfirmEmail";

Amplify.configure(awsconfig);

class SignUpPage extends Component {
  state = {
    email: "",
    password: "",
    status: "SIGN_UP",
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
    console.log(this.state.email);
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
    console.log(this.state.password);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;

    if (this.state.email === "" || this.state.password === "") {
      return;
    }

    try {
      const user = await Auth.signUp(
        this.state.email.toLowerCase(),
        this.state.password
      );
      console.log(user);
      this.setState({ status: "CONFIRM_EMAIL" });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.status === "CONFIRM_EMAIL") {
      return <ConfirmEmail email={this.state.email.toLowerCase()} />;
    }

    return (
      <div className="design-page-styles">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>Sign Up</h3>
              <div className="form-group">
                <label>Email address</label>
                <input
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  onChange={this.handlePasswordChange}
                  value={this.state.password}
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>

              <button
                onClick={this.handleSubmit}
                type="submit"
                className="btn btn-primary btn-block"
              >
                Sign Up
              </button>
              <ul>
                <li className="nav-item">
                  <p className="forgot-password text-left">
                    {" "}
                    Already registered?
                    <Link className="forgot-password text-right" to={"/login"}>
                      {" "}
                      Click Here to sign in
                    </Link>
                  </p>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default SignUpPage;
