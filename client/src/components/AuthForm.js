import React from "react";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

Amplify.configure(awsconfig);

class AuthForm extends React.Component {
  state = {
    form: "SIGN_UP_FORM",
    email: "",
    password: "",
    verificationCode: "",
  };

  componentDidMount() {
    const { dispatch } = this.props;
    Auth.currentAuthenticatedUser()
      .then((response) => {
        dispatch(signIn(response.username));
      })
      .catch((error) => {
        console.log(error);
        dispatch(signOut());
      });
  }

  handleConfirmEmail = async () => {
    try {
      const r = await Auth.confirmSignUp(
        this.state.email,
        this.state.verificationCode
      );
      console.log(r);
      console.log("User account created. Sign in to continue...");
      this.setState({ form: "SIGN_IN_FORM", email: "", password: "" });
    } catch (error) {
      console.log("Error on confirming sign up", error);
    }
  };

  handleSignUp = async () => {
    try {
      const { user } = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
      });
      console.log("User after signup: ", user);
      this.setState({ form: "CONFIRM_EMAIL_FORM" });
    } catch (error) {
      console.log(error);
    }
  };

  handleSignIn = async () => {
    const { dispatch } = this.props;

    try {
      const user = await Auth.signIn(this.state.email, this.state.password);
      console.log("Signed in!: ", user);
      dispatch(signIn(user.username));
    } catch (error) {
      console.log(error);
    }
  };

  handleSignOut = async () => {
    const { dispatch } = this.props;
    try {
      await Auth.signOut();
      dispatch(signOut());
      this.setState({ isAuthenticated: false });
    } catch (error) {
      console.log("Error on signout", error);
    }
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleVerificationCodeChange = (e) => {
    this.setState({ verificationCode: e.target.value });
  };

  renderSignUpForm = () => {
    return (
      <div>
        <h2>Sign UP here</h2>
        Email:
        <input
          type="text"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        Password:
        <input
          type="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <button onClick={this.handleSignUp}>Sign In</button>
        <br />
        <button onClick={() => this.setState({ form: "SIGN_IN_FORM" })}>
          Click here to sign in instead
        </button>
      </div>
    );
  };

  renderSignInForm = () => {
    return (
      <div>
        <h2>Sign in here</h2>
        Email:
        <input
          type="text"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        Password:
        <input
          type="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <button onClick={this.handleSignIn}>Sign In</button>
        <br />
        <button onClick={() => this.setState({ form: "SIGN_UP_FORM" })}>
          Click here to sign up instead
        </button>
      </div>
    );
  };

  renderConfirmEmailForm = () => {
    return (
      <div>
        <h2>Confirm email here</h2>
        Code:
        <input
          type="text"
          value={this.state.verificationCode}
          onChange={this.handleVerificationCodeChange}
        />
        <button onClick={this.handleConfirmEmail}>Submit</button>
      </div>
    );
  };

  renderAlreadySignedIn = () => {
    const { auth } = this.props;

    return (
      <div>
        <h1>You are signed in!</h1>
        <h3>Your user id is: {auth.userID}</h3>

        <button onClick={this.handleSignOut}>Sign Out</button>
      </div>
    );
  };

  render() {
    const { auth } = this.props;
    const { form } = this.state;

    // console.log(this.state);

    if (auth.isAuthenticated) {
      return this.renderAlreadySignedIn();
    } else if (form === "SIGN_IN_FORM") {
      return this.renderSignInForm();
    } else if (form === "CONFIRM_EMAIL_FORM") {
      return this.renderConfirmEmailForm();
    }

    return this.renderSignUpForm();
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AuthForm);
