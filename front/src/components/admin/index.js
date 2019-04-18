import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { string, object } from "yup";
import { withStyles } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import { TextField, Button, Typography } from "@material-ui/core";
import { signInAdmin } from "../../actions/auth.actions";

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
    .matches(/^[\S]{5,18}$/, "The password cannot contain spaces")
});

class Admin extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setFieldError }) => {
            try {
              this.props.signInAdmin(values);
            } catch (errors) {
              errors.forEach(err => {
                setFieldError(err.field, err.error);
              });
            }
          }}
          component={this.form}
        />
      </div>
    );
  }

  form = ({ values, errors, handleBlur, handleChange, handleSubmit }) => {
    const { classes } = this.props;
    return (
      <form className={classes.authForm} onSubmit={handleSubmit}>
        <Typography className={classes.formTitle}>ADMIN LOGIN</Typography>
        <div className={classes.inputs}>
          <TextField
            fullWidth
            label="Username"
            autoComplete="username"
            className={classes.textField}
            disabled={this.props.isSended}
            margin="normal"
            variant="filled"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            helperText={errors.username}
            error={Boolean(errors.username)}
          />
          <TextField
            fullWidth
            label="Password"
            autoComplete="password"
            className={classes.textField}
            disabled={this.props.isSended}
            margin="normal"
            variant="filled"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            helperText={errors.password}
            error={Boolean(errors.password)}
          />
        </div>
        <Button type="submit" className={classes.button}>SIGNIN</Button>
      </form>
    );
  };
}

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%"
  },
  authForm: {
    backgroundColor: indigo[500],
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  formTitle: {
    fontSize: "1.25rem",
    textAlign: "center",
    padding: 12,
    color: "#f2f2f2",
    borderBottom: "1px solid #f2f2f2",
    marginBottom: 10
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    minWidth: "320px"
  },
  button: {
    color: "#f2f2f2",
    padding: 8,
    marginTop: 10,
    fontSize: "1.15rem"
  }
});

const AdminContainer = connect(
  null,
  {
    signInAdmin
  }
)(Admin);

export default withStyles(styles)(AdminContainer);
