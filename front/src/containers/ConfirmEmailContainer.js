import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { Paper } from "@material-ui/core";
import { confirmExecutor } from "../actions/auth.actions";

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

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

const ConfirmEmailContainer = connect(
  mapStateToProps,
  { confirmExecutor }
)(ConfirmEmail);

export default ConfirmEmailContainer;
