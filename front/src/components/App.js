import React, { Component } from "react";
import Auth from "./auth";
import { Route, Switch, Link } from "react-router-dom";
import Admin from "./admin";
import ConfirmEmailContainer from "../containers/ConfirmEmailContainer";
import Main from "../components/main";
import Companies from "./companies/Companies";
import Company from "./companies/Company";
import Profile from "./profile/Profile";
import NotFound from "./notFound";
import withMainLayout from "../routes/MainRoute";

class App extends Component {
  render() {
    return (
      <Switch>
        {/* <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        <Route path="/confirm" component={ConfirmEmailContainer} />F */}
        <Route
          exact
          path="/companies"
          render={() => (
            <Main>
              <Companies />
            </Main>
          )}
        />
        <Route
          path="/companies/:id"
          render={() => (
            <Main>
              <Company />
            </Main>
          )}
        />
        <Route
          path="/profile"
          render={() => (
            <Main>
              <Profile />
            </Main>
          )}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default App;
