import React, { Component } from "react";

//The login page where the user will enter an email and password
export default class LoginPage extends Component {
  render() {
    return (
      <div className="design-page-styles">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>Log In</h3>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
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
