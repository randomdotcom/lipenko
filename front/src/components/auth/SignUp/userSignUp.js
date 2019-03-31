import React, { Component } from "react";
import { TextField, withStyles, Button } from "@material-ui/core";
import { withFormik } from "formik";
import { string, object } from "yup";
import VerificationCodeField from "../VerificationCodeField";

const validationSchema = object().shape({
  username: string()
    .required("Username is required")
    .min(2, "Username must contain atleast 2 characters")
    .max(9, "Username must contain less then 9 characters")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9-_.]{1,9}$/,
      "The username can contain letters, numbers, -, ., _"
    ),
  password: string()
    .required("Enter your password")
    .min(5, "Password must contain atleast 5 characters")
    .max(18, "Password must contain less then 18 characters")
    .matches(/^[\S]{5,18}$/, "The password cannot contain spaces"),
  confirmPassword: string()
    .required("Enter your password again")
    .test("passwords-match", "Passwords must match ya fool", function(value) {
      return this.parent.password === value;
    }),
  email: string()
    .required("Email is required")
    .min(5, "Email must contain atleast 5 characters")
    .max(20, "Email must contain less then 20 characters")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "The email is incorrect"
    ),
  phoneNumber: string()
    .required("Phone number is required")
    .min(13, "Phone number is incorrect, example: +375296667788")
    .max(13, "Phone number is incorrect, example: +375296667788")
    .matches(
      /\+375(29|33|44|25)\d{7}$/,
      "Phone number is incorrect, example: +375296667788"
    )
});

class userSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verificationCode: ''
    };
  }

  handleVerificationCodeChange = event => {
    this.props.handleChange(event.target.value);
  };

  render() {
    const { classes } = this.props;
    const {
      values,
      errors,
      handleChange,
      handleBlur,
      handleSubmit
    } = this.props;

    return (
      <form className={classes.container} onSubmit={handleSubmit} noValidate>
        <TextField
          label="Username"
          autoComplete="username"
          disabled={this.props.isSended}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          helperText={errors.username}
          error={Boolean(errors.username)}
        />
        <TextField
          label="Password"
          autoComplete="new-password"
          disabled={this.props.isSended}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          helperText={errors.password}
          error={Boolean(errors.password)}
        />
        <TextField
          label="Confirm password"
          autoComplete="new-password"
          disabled={this.props.isSended}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmPassword}
          helperText={errors.confirmPassword}
          error={Boolean(errors.confirmPassword)}
        />
        <TextField
          label="Email"
          autoComplete="email"
          disabled={this.props.isSended}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          helperText={errors.email}
          error={Boolean(errors.email)}
        />
        <TextField
          label="Phone number"
          autoComplete="tel"
          disabled={this.props.isSended}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="phoneNumber"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.phoneNumber}
          helperText={errors.phoneNumber}
          error={Boolean(errors.phoneNumber)}
        />
        <div className={classes.VerifyAndConfirmContainer}>
          {this.props.isSended && (
            <VerificationCodeField
              value={this.state.verificationCode}
              handleChange={this.handleVerificationCodeChange}
            />
          )}
          <Button
            onClick={handleSubmit}
            type="submit"
            key="submit"
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

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    flexGrow: 1
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

export default withStyles(styles)(
  withFormik({
    mapPropsToValues: () => ({
      username: "",
      password: "",
      email: "",
      phoneNumber: ""
    }),

    validationSchema: validationSchema,

    handleSubmit: (values, { props, setFieldError }) => {
      try {
        console.log(props)
        if (!props.isSended) {
          props.fetchRegisterUser(
            values.username,
            values.password,
            values.email,
            values.phoneNumber
          );
        } else {
          props.fetchConfirmUser();
        }
      } catch (errors) {
        errors.forEach(err => {
          setFieldError(err.field, err.error);
        });
      }
    },

    displayName: "userSignUp"
  })(userSignUp)
);
