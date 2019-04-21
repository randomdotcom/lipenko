import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { Formik } from "formik";
import { string, object } from "yup";

const validationEditProfile = object().shape({
  username: string()
    .required("Username is required")
    .min(2, "Username must contain atleast 2 characters")
    .max(9, "Username must contain less then 9 characters")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9-_.]{1,9}$/,
      "The username can contain letters, numbers, -, ., _"
    ),
  email: string()
    .required("Email is required")
    .min(5, "Email must contain atleast 5 characters")
    .max(50, "Email must contain less then 50 characters")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "The email is incorrect"
    )
});

const validationNewPassword = object().shape({
  oldPassword: string()
    .required("Enter your password")
    .min(5, "Password must contain atleast 5 characters")
    .max(18, "Password must contain less then 18 characters")
    .matches(/^[\S]{5,18}$/, "The password cannot contain spaces"),
  newPassword: string()
    .required("Enter your password")
    .min(5, "Password must contain atleast 5 characters")
    .max(18, "Password must contain less then 18 characters")
    .matches(/^[\S]{5,18}$/, "The password cannot contain spaces"),
  confirmNewPassword: string()
    .required("Enter your password again")
    .test("passwords-match", "Passwords must match ya fool", function(value) {
      return this.parent.newPassword === value;
    })
});

class AdminProfileEdit extends Component {
  render() {
    const { classes, username, email } = this.props;
    return (
      <div className={classes.root}>
        <Formik
          initialValues={{ username, email }}
          validationSchema={validationEditProfile}
          onSubmit={({ username, email }, { setFieldError }) => {
            try {
              this.props.editAdmin({ username, email });
            } catch (errors) {
              errors.forEach(err => {
                setFieldError(err.field, err.error);
              });
            }
          }}
          component={this.EditProfileForm}
        />
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: ""
          }}
          validationSchema={validationNewPassword}
          onSubmit={({ oldPassword, newPassword }, { setFieldError }) => {
            try {
              this.props.changePasswordAdmin({ oldPassword, newPassword });
            } catch (errors) {
              errors.forEach(err => {
                setFieldError(err.field, err.error);
              });
            }
          }}
          component={this.NewPasswordForm}
        />
      </div>
    );
  }

  EditProfileForm = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors
  }) => {
    const { classes } = this.props;
    return (
      <form className={classes.container} onSubmit={handleSubmit} noValidate>
        <TextField
          label="Username"
          autoComplete="username"
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
          label="Email"
          autoComplete="email"
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
        <Button
          key="submit"
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          CONFIRM
        </Button>
      </form>
    );
  };

  NewPasswordForm = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors
  }) => {
    const { classes } = this.props;
    return (
      <form className={classes.container} onSubmit={handleSubmit} noValidate>
        <TextField
          label="Old password"
          autoComplete="new-password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="password"
          name="oldPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.oldPassword}
          helperText={errors.oldPassword}
          error={Boolean(errors.oldPassword)}
        />
        <TextField
          label="New password"
          autoComplete="new-password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="password"
          name="newPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.newPassword}
          helperText={errors.newPassword}
          error={Boolean(errors.newPassword)}
        />
        <TextField
          label="Confirm new password"
          autoComplete="new-password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="password"
          name="confirmNewPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmNewPassword}
          helperText={errors.confirmNewPassword}
          error={Boolean(errors.confirmNewPassword)}
        />
        <Button
          key="submit"
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          CHANGE PASSWORD
        </Button>
      </form>
    );
  };
}

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 20,
    backgroundColor: "whitesmoke",
    boxShadow: "0 1px 7px 1px rgba(0, 0, 0, .25)",
    padding: 25,
    fontSize: "1.2rem"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    flexGrow: 1
  }
});

export default withStyles(styles)(AdminProfileEdit);
