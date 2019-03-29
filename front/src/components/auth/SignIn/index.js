import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withSnackbar } from "notistack";
import VerificationCodeField from "../VerificationCodeField";
import {
  fetchConfirmUser,
  fetchNewVerificationCodeForUser,
  fetchNewVerificationCodeForExecutor
} from "../../../fetches/auth/";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      usernameError: "",
      password: "",
      passwordError: "",
      isVerified: true,
      isSended: false,
      verificationCode: "",
      selectedForm: "user"
    };
  }

  validate = afterSetState => {
    let usernameError = "";
    let passwordError = "";

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

    this.setState({ usernameError, passwordError }, afterSetState);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleMessage = (msg, variant) => {
    this.props.enqueueSnackbar(msg, { variant });
  };

  handleSubmit = () => {
    if (!this.state.isSended) {
      this.validate(() => {
        if (this.state.selectedForm === "user") {
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
                  throw json.error;
                } else if (json.isVerified === false) {
                  this.setState({ isVerified: false, isSended: true });
                  fetchNewVerificationCodeForUser.call(this, {
                    username: this.state.username,
                    password: this.state.password
                  });
                  throw "Вы забыли подтвердить аккаунт, мы выслали вам ещё один код на почту!";
                } else {
                  localStorage.setItem("token", json.token);

                  return {
                    username: json.username,
                    email: json.email,
                    phoneNumber: json.phoneNumber,
                    role: json.role
                  };
                }
              })
              .then(user => {
                this.props.signIn(user);
                this.handleMessage("Вход успешный!", "success");
                console.log(user);
              })
              .catch(err => this.handleMessage(err, "error"));
          }
        } else if (this.state.selectedForm === "executor") {
          fetch(`http://localhost:3002/api/companies/signin`, {
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
              console.log(json)
              if (json.error) {
                throw json.error;
              } else if (json.isVerified === false) {
                this.setState({ isVerified: false, isSended: true });
                fetchNewVerificationCodeForExecutor.call(this, {
                  username: this.state.username,
                  password: this.state.password
                });
                throw "Вы забыли подтвердить аккаунт, мы выслали вам ещё одно сообщение на почту!";
              } else {
                localStorage.setItem("token", json.token);

                return {
                  username: json.username,
                  email: json.email,
                  phoneNumber: json.phoneNumber,
                  role: json.role
                };
              }
            })
            .then(user => {
              this.props.signIn(user);
              this.handleMessage("Вход успешный!", "success");
              console.log(user);
            })
            .catch(err => this.handleMessage(err, "error"));
        } else {
          this.handleMessage('Не выбран ни один radiobutton??', "error");
        }
      });
    } else {
      fetchConfirmUser.call(this, this.state.verificationCode);
    }
  };

  handleVerificationCodeChange = verificationCode => {
    this.setState({ verificationCode }, () =>
      console.log(this.state.verificationCode)
    );
  };

  handleChangeRadioButton = event => {
    this.setState({ selectedForm: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <RadioGroup
          row
          aria-label="Gender"
          name="gender1"
          className={classes.group}
          value={this.state.selectedForm}
          onChange={this.handleChangeRadioButton}
        >
          <FormControlLabel
            value="user"
            control={<Radio />}
            labelPlacement="end"
            label="User"
          />
          <FormControlLabel
            value="executor"
            control={<Radio />}
            labelPlacement="end"
            label="Executor"
          />
        </RadioGroup>
        <TextField
          label="Username"
          autoComplete="username"
          className={classes.textField}
          onChange={this.handleChange("username")}
          helperText={this.state.usernameError}
          error={Boolean(this.state.usernameError)}
          disabled={!this.state.isVerified}
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
          disabled={!this.state.isVerified}
          type="password"
          fullWidth
        />
        <div className={classes.VerifyAndConfirmContainer}>
          {this.state.isVerified === false && (
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
            SIGN IN
          </Button>
        </div>
      </form>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const styles = theme => ({
  margin: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap"
  },
  group: {
    display: "flex"
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250
  },
  VerifyAndConfirmContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default withStyles(styles)(withSnackbar(SignIn));
