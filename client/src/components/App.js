import React from "react";
import TrelloBoard from "./TrelloBoard";
import NavBar from "./NavBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <NavBar /> */}
        {/* <TrelloBoard /> */}
        {/* <Route component={HomePage} exact path="/" /> */}
      </Switch>
    </BrowserRouter>
  );
}
