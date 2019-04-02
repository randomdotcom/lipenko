import React, { Component } from "react";
import Auth from "./auth";
import { Route, Switch, Link } from "react-router-dom";
import Admin from './admin'
import ConfirmEmailContainer from '../containers/ConfirmEmailContainer'
import Main from '../components/main'
import Companies from './companies'
import Profile from './profile'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        <Route path="/confirm" component={ConfirmEmailContainer} />
        <Switch>
          <Route path="/" component={Main} />
          <Switch>
            <Route path="/companies" component={Companies} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </Switch>
      </Switch>
    );
  }
}

export default App;
