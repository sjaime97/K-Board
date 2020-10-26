import React, {Component} from 'react';
import TrelloList from "./TrelloList";


class App extends Component {
  render(){
    return (
      <div className="App">
        <h1>K-Board</h1>
        <TrelloList title="Tasks"/>
      </div>
    );
  }
}  

export default App;
