import React, { Component } from "react";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signIn, signOut } from "../actions";
import TrelloBoard from "../components/TrelloBoard";

Amplify.configure(awsconfig);

class TrelloBoardPage extends Component {
  state = {
    status: "loading",
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    try {
      const response = await Auth.currentAuthenticatedUser();
      console.log("Response: ", response);
      dispatch(signIn(response.username));
    } catch (error) {
      console.log("E: ", error);
      dispatch(signOut());
    }
    this.setState({ status: "done" });
  }

  render() {
    const { auth } = this.props;

    if (this.state.status === "loading") {
      return <span>Loading...</span>;
    }

    return (
      <div>
        {!auth.isAuthenticated ? <Redirect to="/login" /> : <TrelloBoard />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(TrelloBoardPage);
