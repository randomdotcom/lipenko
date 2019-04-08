import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Admin from "./admin";
import Auth from "./auth";
import ConfirmEmailContainer from "./auth/ConfirmEmailContainer";
import Companies from "./companies";
import Company from "./companies/Company";
import Profile from "./profile";
import NotFound from "./NotFound";
import withMainLayout from "../routes/MainRoute";
import PrivateRoute from "../routes/PrivateRoute";

class App extends Component {
  MainRedirect = () => <Redirect to="/companies" />;

  render() {
    const { isAuthenticated } = this.props;
    return (
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        <Route path="/confirm" component={ConfirmEmailContainer} />
        <Route exact path="/" component={this.MainRedirect} />
        <Route exact path="/companies" component={withMainLayout(Companies)} />
        <Route path="/companies/:id" component={withMainLayout(Company)} />
        <PrivateRoute
          path="/profile"
          isAuthenticated={isAuthenticated}
          component={withMainLayout(Profile)}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.profile.isAuthenticated
});

export default connect(mapStateToProps)(App);
