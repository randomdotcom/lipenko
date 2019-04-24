import React from "react";
import { Route } from "react-router-dom";
import NotAuthenticated from "../components/NotAuthenticated";

const AdminRoute = ({
  component: Component,
  isAuthenticated,
  role,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated && role === "admin" ? (
        <Component {...props} />
      ) : (
        <NotAuthenticated />
      )
    }
  />
);

export default AdminRoute;
