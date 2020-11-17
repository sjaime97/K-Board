import React, { Component } from "react";
import { Link } from "react-router-dom";

//This is the page that will prompt the user to enter a numeric code after signing up
export default class ConfirmEmailPage extends Component {
  render() {
    return (
      <div className="design-page-styles">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>Email Code Confirmation</h3>
              <div className="form-group">
                <label>Enter code here</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="4 digit code"
                />
              </div>
              <ul>
                <li className="nav-item">
                  <Link className="forgot-password text-right" to={"/"}>
                    {" "}
                    Resend code to email
                  </Link>
                </li>
              </ul>
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
