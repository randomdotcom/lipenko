import React, { Component } from "react";
import Auth from "./auth/Auth";
import { Route, Switch } from "react-router-dom";
import { Link } from "@material-ui/core";

class App extends Component {
  render() {
    return (
      <>
        <Route path="/auth" component={Auth} />
      </>
    );
  }
}

export default App;
