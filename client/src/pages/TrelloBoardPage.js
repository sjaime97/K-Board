import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import TrelloBoard from "../components/TrelloBoard";

const TrelloBoardPage = (props) => {
  const { dispatch, auth } = props;

  return (
    <div>
      {!auth.isAuthenticated ? <Redirect to="/login" /> : <TrelloBoard />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(TrelloBoardPage);
