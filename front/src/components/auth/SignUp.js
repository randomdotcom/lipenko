import React, { Component } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withSnackbar } from "notistack";

import PhoneMask from "./PhoneMask";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      usernameError: "",
      password: "",
      passwordError: "",
      confirmPassword: "",
      confirmPasswordError: "",
      email: "",
      emailError: "",
      phoneNumber: "",
      phoneNumberError: ""
    };
  }

  validate = afterSetState => {
    let usernameError = "";
    let passwordError = "";
    let confirmPasswordError = "";
    let emailError = "";
    let phoneNumberError = "";

    if (!this.state.username) {
      usernameError = "Field is required";
    } else if (this.state.username.indexOf(" ") !== -1) {
      usernameError = "The username cannot contain spaces";
    } else if (this.state.username.length < 4) {
      usernameError = "Username length should be 4 symbols or more";
    }

    if (!this.state.password) {
      passwordError = "Field is required";
    } else if (this.state.password.length < 5) {
      passwordError = "Password length should be 5 symbols or more";
    }

    if (!this.state.confirmPassword) {
      confirmPasswordError = "Field is required";
    } else if (this.state.password !== this.state.confirmPassword) {
      confirmPasswordError = "Passwords do not match";
    }

    if (!this.state.email) {
      emailError = "Field is required";
    } else if (
      (this.state.email.length < 6) |
      (this.state.email.indexOf("@") === -1)
    ) {
      emailError = "Email is incorrect";
    }

    if (
      (this.state.phoneNumber.length > 0) &
      (this.state.phoneNumber.length < 13)
    ) {
      phoneNumberError = "Phone number is incorrect";
    }

    this.setState(
      {
        usernameError,
        passwordError,
        confirmPasswordError,
        emailError,
        phoneNumberError
      },
      afterSetState
    );
  };

  handleMessage = (msg, variant) => {
    this.props.enqueueSnackbar(msg, { variant });
  };

  handleSubmit = () => {
    this.validate(() => {
      if (
        !this.state.usernameError &
        !this.state.passwordError &
        !this.state.confirmPasswordError &
        !this.state.emailError &
        !this.state.phoneNumberError
      ) {
        fetch(`http://localhost:3002/api/clients/register`, {
          method: "POST",
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber
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
              this.handleMessage("Регистрация успешна, подтвердите электронную почту!", "success");
              console.log(json);
            }
          })
          .catch(() => this.handleMessage("Неизвестная ошибка", "error"));
      }
    });
  };

  handleChange = name => event => {
    if (name === "phoneNumber") {
      const value = event.target.value.replace(/[() ]*/g, "");
      this.setState({ [name]: value }, () => {
        console.log(this.state[name]);
      });
    } else {
      this.setState({ [name]: event.target.value }, () => {
        console.log(this.state[name]);
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { textmask } = this.state;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label="Username"
          autoComplete="username"
          helperText={this.state.usernameError}
          error={Boolean(this.state.usernameError)}
          className={classes.textField}
          onChange={this.handleChange("username")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          autoComplete="new-password"
          helperText={this.state.passwordError}
          error={Boolean(this.state.passwordError)}
          className={classes.textField}
          onChange={this.handleChange("password")}
          margin="normal"
          variant="outlined"
          type="password"
        />
        <TextField
          label="Confirm password"
          autoComplete="new-password"
          helperText={this.state.confirmPasswordError}
          error={Boolean(this.state.confirmPasswordError)}
          className={classes.textField}
          onChange={this.handleChange("confirmPassword")}
          margin="normal"
          variant="outlined"
          type="password"
        />
        <TextField
          label="Email"
          autoComplete="email"
          helperText={this.state.emailError}
          error={Boolean(this.state.emailError)}
          className={classes.textField}
          onChange={this.handleChange("email")}
          margin="normal"
          variant="outlined"
          type="email"
        />
        <TextField
          label="Phone number"
          autoComplete="tel"
          helperText={this.state.phoneNumberError}
          error={Boolean(this.state.phoneNumberError)}
          value={textmask}
          onChange={this.handleChange("phoneNumber")}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          InputProps={{
            inputComponent: PhoneMask
          }}
        />
        <Button
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          SIGN UP
        </Button>
      </form>
    );
  }
}

SignUp.propTypes = {
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

export default withStyles(styles)(withSnackbar(SignUp));
