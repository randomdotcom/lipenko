import React, { Component } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withSnackbar } from "notistack";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      usernameError: "",
      password: "",
      passwordError: ""
    };
  }

  validate = (afterSetState) => {
    let usernameError = "";
    let passwordError = "";

    if (!this.state.username) {
      usernameError = "Field is required";
    } else if (this.state.username.indexOf(" ") !== -1) {
      usernameError = "The username cannot contain spaces";
    } else if (this.state.username.length < 4) {
      usernameError = "Username length should be 4 symbols or more"
    }

    if (!this.state.password) {
      passwordError = "Field is required";
    } else if (this.state.password.length < 5) {
      passwordError = "Password length should be 5 symbols or more";
    }

    this.setState({ usernameError, passwordError }, afterSetState);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleMessage = (msg, variant) => {
    this.props.enqueueSnackbar(msg, { variant });
  };

  handleSubmit = () => {
    this.validate(() => {
      if (!this.state.usernameError & !this.state.passwordError) {
        fetch(`http://localhost:3002/api/clients/signin`, {
          method: "POST",
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            return res.json();
          })
          .then(json => {
            if (json.error) {
              this.handleMessage(json.error, "error");
            } else {
              this.handleMessage("Вход успешный!", "success");
              console.log(json);
            }
          })
          .catch(() => this.handleMessage("Неизвестная ошибка", "error"));
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label="Username"
          autoComplete="username"
          className={classes.textField}
          onChange={this.handleChange("username")}
          helperText={this.state.usernameError}
          error={Boolean(this.state.usernameError)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          autoComplete="current-password"
          className={classes.textField}
          onChange={this.handleChange("password")}
          margin="normal"
          variant="outlined"
          helperText={this.state.passwordError}
          error={Boolean(this.state.passwordError)}
          type="password"
          fullWidth
        />
        <Button
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
        SIGN IN
        </Button>
      </form>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap"
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

export default withStyles(styles)(withSnackbar(SignIn));
