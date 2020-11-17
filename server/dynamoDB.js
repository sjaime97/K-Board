const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com",
});

const docClient = new AWS.DynamoDB.DocumentClient();

async function getBoard(userID, boardID) {
  // return docClient.get()
}

async function getListOfBoards(userID) {
  // return docClient.get()
}

module.exports = {
  getBoard,
  getListOfBoards,
};
