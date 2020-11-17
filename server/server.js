const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const mockDatabase = require("./mockData");
const bodyParser = require("body-parser");
const dbClient = require("./dynamoDB");

app.use(bodyParser.json());
app.use(cors());

// Returns a list of boards given a userID
app.get("/boards", (req, res) => {
  const { userID } = req.query;

  // Return error code if no userID was provided
  if (!userID) {
    return res.status(400);
  }

  // Get user data from database
  const userData = mockDatabase[userID];
  if (!userData) {
    console.log("User: ", userID, " DNE");
    return res.sendStatus(404);
  }

  // Build list of boards = [{boardsID: hash#1, boardName: 'hello'}]
  const listOfBoards = userData.userBoards.map((board) => ({
    boardID: board.boardID,
    boardName: board.boardName,
  }));
  console.log(listOfBoards);

  return res.status(200).send({
    boards: listOfBoards,
  });
});

// Saves a board given the userID, boardID, and new data
app.post("/board", (req, res) => {
  const { userID, boardID, data } = req.body;

  // If any of them are undefined
  if (!userID || !boardID || !data) {
    return res.sendStatus(400);
  }

  // TODO: Query DynamoDB to save new data

  // If succeeded, return 200
  return res.sendStatus(200);
});

// Returns 1 board given the userID and boardID
app.get("/board", (req, res) => {
  const { userID, boardID } = req.query;

  // Return error code if userID or boardID wasn't provided
  if (!userID || !boardID) {
    return res.sendStatus(400);
  }

  // Get user data from db
  const userData = mockDatabase[userID];
  if (!userData) {
    console.log("User: ", userID, " DNE");
    return res.sendStatus(404);
  }

  // Iterate through board list and return data of board desired (by boardID)
  const boards = userData.userBoards;
  for (let i = 0; i < boards.length; i++) {
    const board = boards[i];
    if (board.boardID === boardID) {
      return res
        .status(200)
        .send({ boardTitle: board.boardName, data: board.boardData });
    }
  }

  // If not found, return 404
  return res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
