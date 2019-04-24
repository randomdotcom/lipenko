import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Admin from "../containers/admin";
import Auth from "../containers/auth";
import ConfirmEmailContainer from "../containers/auth/ConfirmEmailContainer";
import Companies from "../containers/companies";
import Company from "../containers/companyPage";
import Profile from "../containers/profile";
import ProfileEdit from "../containers/profile/edit";
import NotFound from "./NotFound";
import withMainLayout from "../routes/MainRoute";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "../routes/AdminRoute";
import Book from "../containers/book";
import NotAuthRoute from "../routes/NotAuthRoute";
import Bookings from "../containers/profile/bookings";
import ErrorHandle from "../containers/ErrorHandleContainer";
import EventHandle from "../containers/EventHandleContainer";
import CustomersList from "../containers/admin/CustomersListPage";

export default class App extends Component {
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
