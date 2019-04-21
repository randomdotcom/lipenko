import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Admin from "./admin";
import Auth from "./auth";
import ConfirmEmailContainer from "./auth/ConfirmEmailContainer";
import Companies from "./companies";
import Company from "./companies/CompanyPage";
import Profile from "./profile";
import ProfileEdit from "./profile/edit"; 
import NotFound from "./NotFound";
import withMainLayout from "../routes/MainRoute";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "../routes/AdminRoute";
import Book from "./book";
import NotAuthRoute from "../routes/NotAuthRoute";
import Bookings from "./profile/bookings";
import ErrorHandle from "./ErrorHandle";
import EventHandle from "./EventHandle";
import CustomersList from "./admin/CustomersListPage";

class App extends Component {
  MainRedirect = () => <Redirect to="/companies" />;

  render() {
    const { isAuthenticated, role } = this.props;
    return (
      <>
        <ErrorHandle />
        <EventHandle />
        <Switch>
          <NotAuthRoute
            exact
            path="/admin"
            isAuthenticated={isAuthenticated}
            component={Admin}
          />
          <NotAuthRoute
            exact
            path="/auth"
            isAuthenticated={isAuthenticated}
            component={Auth}
          />
          <Route exact path="/confirm" component={ConfirmEmailContainer} />
          <Route exact path="/" component={this.MainRedirect} />
          <Route
            exact
            path="/companies"
            component={withMainLayout(Companies)}
          />
          <Route path="/companies/:id" component={withMainLayout(Company)} />
          <PrivateRoute
            exact
            path="/profile"
            isAuthenticated={isAuthenticated}
            component={withMainLayout(Profile)}
          />
          <PrivateRoute
            exact
            path="/profile/edit"
            isAuthenticated={isAuthenticated}
            component={withMainLayout(ProfileEdit)}
          />
          <PrivateRoute
            exact
            path="/profile/bookings"
            isAuthenticated={isAuthenticated}
            component={withMainLayout(Bookings)}
          />
          <AdminRoute
            exact
            path="/admin/customers"
            isAuthenticated={isAuthenticated}
            role={role}
            component={withMainLayout(CustomersList)}
          />
          <Route
            exact
            path="/book"
            isAuthenticated={isAuthenticated}
            component={withMainLayout(Book)}
          />
          <Route component={NotFound} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.profile.isAuthenticated,
  role: state.profile.role
});

export default connect(mapStateToProps)(App);
