import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from "../components/NavBar";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/*Header code*/}
        <NavBar />

        <Switch>
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
