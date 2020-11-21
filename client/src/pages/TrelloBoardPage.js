import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { signIn, signOut, setListState } from "../actions";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import TrelloBoard from "../components/TrelloBoard";
import apiURL from "../constants/apiURL";

Amplify.configure(awsconfig);

// /board/:boardID
function TrelloBoardPage(props) {
  const { auth, dispatch } = props;
  const { boardID } = useParams();
  const [status, setStatus] = useState("loading");
  const [boardName, setBoardName] = useState("");

  useEffect(() => {
    async function getBoard() {
      let response;
      try {
        response = await Auth.currentAuthenticatedUser();
        dispatch(signIn(response.username));
      } catch (error) {
        dispatch(signOut());
        setStatus("done");
        return;
      }

      try {
        const { data } = await axios.get(
          `${apiURL}/board?userID=${response.username}&boardID=${boardID}`
        );
        console.log("Response from axios: ", data);
        dispatch(setListState(data.boardData));
        setBoardName(data.boardName);
        setStatus("done");
      } catch (error) {
        console.log("Axios error: ", error);
        setStatus("error");
        console.log("not found");
      }
    }
    getBoard();
  }, []);

  async function saveStateOnDB() {
    const { lists } = props;
    console.log("I am gonna save: ", lists);

    setTimeout(async () => {
      console.log("SAVING!");
      try {
        const response = await axios.put(`${apiURL}/board`, {
          userID: auth.userID,
          boardID: boardID,
          data: lists,
        });

        console.log("Res: ", response);
      } catch (error) {
        console.log("Error on save: ", error);
      }
    }, 1000);
  }

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (!auth.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  if (status === "error") {
    return <span>404 board not found</span>;
  }

  return (
    <TrelloBoard title={boardName} id={boardID} saveStateOnDB={saveStateOnDB} />
  );
}

const mapStateToProps = (state) => ({
  lists: state.lists,
  auth: state.auth,
});

export default connect(mapStateToProps)(TrelloBoardPage);
