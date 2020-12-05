# K-Board
__San Jose State University__ <br />
__Class: CMPE 172 - Enterprise Software__ <br />
__Fall 2020__ <br />
__Team Members: Francisco Ibarra, Nathan Abegaz, Samantha Jaime__ <br />

K-Board is a project management web application that allows users to visually organize project tasks. It is a Kanban-style list-making web application similar to solutions like Trello or Jira. K-board was implmented in a three-tier architechtire model for better development flexibility. <br />

Users can create boards for projects and create lists based on the project needs and delete once a task has reached completion. K-Board comes with a simple UI that makes it easy for a user to manage boards and lists. 

## Demo Screenshots 
<img src="https://i.imgur.com/Grm2WmO.png" alt="Diagram" />
<img src="https://i.imgur.com/BtxhFrk.png" alt="Login" />
<img src="https://i.imgur.com/BBjxUzF.png" alt="Dashboard" />
<img src="https://i.imgur.com/I2g36RE.png" alt="K-Board" />

## Folder Structure 
Source code is organized as follows: <br/>
* Client (Front-End) <br/>
  * HTML, CSS, JS Code <br/>
* Server (Backend) <br/>
  * Node code <br/>
* Scripts <br/>
  * DB Schema <br/>
  * Docker build script <br/>
* Readme

## How to Run Locally 

Clone this repository by doing:
```
git clone https://github.com/Francisco-Ibarra07/K-Board.git
```

`cd` into the `client` folder and run `npm install`
- This will install all frontend dependencies

`cd` into the `server` folder and run `npm install`
- This will install all of the API dependencies

To run the frontend, do:
```
npm start
```
inside the `client` folder

To run the backend, do:
```
node server.js
```
inside the `server` folder

## System Diagram 
<img src="https://i.imgur.com/pvmuYpE.png" alt="System-Diagram" />

## Sequence Diagram 
<img src="https://i.imgur.com/3XWlAKh.png" alt="Sequence" />


## DB Schema
<img src="https://i.imgur.com/KAYpX44.png" alt="DB-Schema" />

## API End Points 
<img src="https://i.imgur.com/And2QqY.png" alt="end-points" />
