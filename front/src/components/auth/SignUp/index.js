import React, { Component } from "react";
import PropTypes from "prop-types";
import PhoneMask from "./PhoneMask";
import VerificationCodeField from "../VerificationCodeField";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withSnackbar } from "notistack";
import { fetchConfirmUser, fetchRegisterUser } from "../../../fetches/auth/";

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
      phoneNumberError: "",
      verificationCode: "",
      isSended: false
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
    } else if (this.state.username.length < 2 || this.state.username.length > 9) {
      usernameError = "Username must be longer than 2 characters but less than 9";
    }

    if (!this.state.password) {
      passwordError = "Field is required";
    } else if (this.state.password.length < 5 || this.state.password.length > 18) {
      passwordError = "Password must be longer than 5 characters but less than 18";
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

    if (!this.state.phoneNumber) {
      phoneNumberError = "Field is required";
    } else if (this.state.phoneNumber.length < 9) {
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
    if (!this.state.isSended) {
      this.validate(() => {
        if (
          !this.state.usernameError &
          !this.state.passwordError &
          !this.state.confirmPasswordError &
          !this.state.emailError &
          !this.state.phoneNumberError
        ) {
          fetchRegisterUser.call(this, {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber
          });
        }
      });
    } else {
      fetchConfirmUser.call(this, this.state.verificationCode);
    }
  };

  handleChange = name => event => {
    console.log("вызов");
    if (name === "phoneNumber") {
      const value = event.target.value.replace(/(\+375|\s|\(|\))/g, "");
      this.setState({ [name]: value });
    } else {
      this.setState({ [name]: event.target.value });
    }
  };

  handleVerificationCodeChange = verificationCode => {
    this.setState({ verificationCode }, () =>
      console.log(this.state.verificationCode)
    );
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
          disabled={this.state.isSended}
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
          disabled={this.state.isSended}
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
          disabled={this.state.isSended}
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
          disabled={this.state.isSended}
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
          disabled={this.state.isSended}
          value={textmask}
          onChange={this.handleChange("phoneNumber")}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          InputProps={{
            inputComponent: PhoneMask
          }}
        />
        <div className={classes.VerifyAndConfirmContainer}>
          {this.state.isSended && (
            <VerificationCodeField
              verificationCode={this.state.verificationCode}
              handleChange={this.handleVerificationCodeChange}
            />
          )}
          <Button
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
          >
            SIGN UP
          </Button>
        </div>
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
  margin: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250
  },
  verificationField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150
  },
  VerifyAndConfirmContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default withStyles(styles)(withSnackbar(SignUp));
