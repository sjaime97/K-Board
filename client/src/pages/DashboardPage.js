import React, { Component } from "react";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signIn, signOut } from "../actions";
import BoardCard from "../components/BoardCard";
import axios from "axios";

Amplify.configure(awsconfig);

//The home page with a welcome message to the user
class DashboardPage extends Component {
  state = {
    status: "loading",
    listOfBoardNames: [],
    newBoardTitle: "",
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    let response;
    try {
      response = await Auth.currentAuthenticatedUser();
      console.log("Response: ", response);
      dispatch(signIn(response.username));
    } catch (error) {
      console.log("E: ", error);
      dispatch(signOut());
      this.setState({ status: "done" });
      return;
    }

    try {
      const { data } = await axios.get(
        `http://localhost:5000/boards?userID=${response.username}`
      );

      console.log("Response from axios: ", data);
      this.setState({ listOfBoardNames: data.listOfBoardNames });
      console.log("New list: ", this.state.listOfBoardNames);
    } catch (error) {
      console.log("Axios error: ", error);
    }

    this.setState({ status: "done" });
    console.log("done!");
  }

  handleNewBoardTitleChange = (e) => {
    this.setState({ newBoardTitle: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("click");
    // Make a post request to create a new board
    // pass in {this.state.newBoardTitle, userID } in the body
  };

  render() {
    const { auth } = this.props;

    if (this.state.status === "loading") {
      return <span>Loading...</span>;
    }

    if (!auth.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    // [{boardId, boardName}]
    console.log("Rendering cards and stuff");
    console.log("List to render: ", this.state.listOfBoardNames);
    return (
      <div style={styles.homeContainer}>
        <div style={styles.thumbnails}>
          {/* Iterate through boards and create a card for each */}
          {this.state.listOfBoardNames.length === 0 && (
            <h1>You have no boards created yet</h1>
          )}
          {this.state.listOfBoardNames.map((board) => {
            return (
              <BoardCard
                key={`card-${board.boardID}`}
                title={board.boardName}
                id={board.boardID}
              />
            );
          })}
          {/* submit form to create new board*/}
          <form style={{ textAlign: "center" }}>
            Create a new board
            <div
              style={styles.createInput}
              onChange={this.handleNewBoardTitleChange}
              value={this.state.newBoardTitle}
              placeholder="Enter New Board Name Here"
              type="text"
            />
            <button className="board-home" onClick={this.handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const styles = {
  homeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    marginTop: "100px",
  },
  thumbnails: {
    flex: 1,
    height: "50%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  createInput: {
    width: "400px",
    height: "70px",
    fontsize: "22px",
    padding: "10px",
    boxSizing: "border-box",
    borderRadius: "3px",
    border: "none",
    outlineColor: "blue",
    boxShadow: "0 2px 4px grey",
    alignSelf: "center",
    margin: "40px",
  },
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(DashboardPage);
