import React, { Component } from "react";
import { fetchConfirmEmailExecutor } from "../../../fetches/auth";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import queryString from "query-string";

class ConfirmEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmed: false,
      error: ""
    };
  }

  componentWillMount() {
    const { token } = queryString.parse(this.props.location.search);
    console.log(token);
    fetchConfirmEmailExecutor.call(this, token)
      .then(() => {
        this.setState({ confirmed: true });
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  }

  handleMessage = (msg, variant) => {
    this.props.enqueueSnackbar(msg, { variant });
  };

  render() {
    const { confirmed, error } = this.state;

    return (
      <>
        <Paper>
          {confirmed === true ? (
            <>
              Email confirmed successfully!
              <Link to="/">Go to the main page</Link>
            </>
          ) : (
            <>
              Something is wrong! Error: {error}
              <Link to="/auth">Go to the auth page</Link>
            </>
          )}
        </Paper>
      </>
    );
  }
}

export default ConfirmEmail;
