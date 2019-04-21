import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { Paper } from "@material-ui/core";

class ConfirmEmail extends Component {
  componentWillMount() {
    const { token } = queryString.parse(this.props.location.search);
    this.props.confirmExecutor(token);
  }

  handleMessage = (msg, variant) => {
    this.props.enqueueSnackbar(msg, { variant });
  };

  render() {
    return (
      <>
        <Paper>
          {this.props.isAuthenticated ? (
            <>
              Email confirmed successfully!
              <Link to="/">Go to the main page</Link>
            </>
          ) : (
            <>
              Something is wrong!
              <Link to="/auth">Go to the auth page</Link>
            </>
          )}
        </Paper>
      </>
    );
  }
}

export default ConfirmEmail;
