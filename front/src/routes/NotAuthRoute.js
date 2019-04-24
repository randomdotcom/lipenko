import React from "react";
import { Route, Redirect } from "react-router-dom";

const NotAuthRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Redirect to="/profile" /> : <Component {...props} />
    }
  />
);

export default NotAuthRoute;
