import React from "react";
import { Route } from "react-router-dom";
import NotAuthenticated from "../components/NotAuthenticated";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <NotAuthenticated />
    }
  />
);

export default PrivateRoute;
