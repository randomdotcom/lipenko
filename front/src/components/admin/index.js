import React, { Component } from "react";
import { Formik } from "formik";
import { string, object } from "yup";
import { withStyles } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import { TextField, Button, Typography } from "@material-ui/core";

const validationSchema = object().shape({
  username: string()
    .required("Введите имя пользователя")
    .min(2, "Имя пользователя должно содержать хотябы 2 символа")
    .max(9, "Имя пользователя должно содержать меньше 10 символов")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9-_.]{1,9}$/,
      "Имя пользователя может содержать буквы, цифры, -, ., _"
    ),
  password: string()
    .required("Введите свой пароль")
    .min(5, "Пароль должен содержать больше 4 символов")
    .max(18, "Пароль должен содержать меньше 19 символов")
    .matches(/^[\S]{5,18}$/, "Пароль не может содержать пробелы")
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
        <Typography className={classes.formTitle}>АВТОРИЗАЦИЯ</Typography>
        <div className={classes.inputs}>
          <TextField
            fullWidth
            label="Имя пользователя"
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
            label="Пароль"
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
        <Button type="submit" className={classes.button}>
          ВОЙТИ
        </Button>
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
    backgroundColor: indigo[300],
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

export default withStyles(styles)(Admin);
