import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { Formik } from "formik";
import { string, object } from "yup";

const validationEditProfile = object().shape({
  username: string()
    .required("Введите имя пользователя")
    .min(2, "Имя пользователя должно содержать хотябы 2 символа")
    .max(9, "Имя пользователя должно содержать меньше 10 символов")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9-_.]{1,9}$/,
      "Имя пользователя может содержать буквы, цифры, -, ., _"
    ),
  email: string()
    .required("Введите электронную почту")
    .min(5, "Эл. почта должна содержать больше 4 символов")
    .max(50, "Эл. почта должна содержать меньше 51 символов")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Эл. почта неверная"
    ),
  phoneNumber: string()
    .required("Введите номер телефона")
    .min(13, "Номер телефона неверный, пример: +375296667788")
    .max(13, "Номер телефона неверный, пример: +375296667788")
    .matches(
      /\+375(29|33|44|25)\d{7}$/,
      "Номер телефона неверный, пример: +375296667788"
    ),
  adress: string()
    .required("Введите свой адрес")
    .min(6, "Адрес должен содержать больше 5 символов")
    .max(60, "Адрес слишком длинный")
});

const validationNewPassword = object().shape({
  oldPassword: string()
    .required("Введите свой пароль")
    .min(5, "Пароль должен содержать больше 4 символов")
    .max(18, "Пароль должен содержать меньше 19 символов")
    .matches(/^[\S]{5,18}$/, "Пароль не может содержать пробелы"),
  newPassword: string()
    .required("Введите свой пароль")
    .min(5, "Пароль должен содержать больше 4 символов")
    .max(18, "Пароль должен содержать меньше 19 символов")
    .matches(/^[\S]{5,18}$/, "Пароль не может содержать пробелы"),
  confirmNewPassword: string()
    .required("Введите свой пароль еще раз")
    .test("passwords-match", "Пароли не совпадают", function (value) {
      return this.parent.newPassword === value;
    })
});

class UserProfileEdit extends Component {
  render() {
    const { classes, username, email, phoneNumber, adress } = this.props;
    return (
      <div className={classes.root}>
        <Formik
          initialValues={{ username, email, phoneNumber, adress }}
          validationSchema={validationEditProfile}
          onSubmit={(
            { username, email, phoneNumber, adress },
            { setFieldError }
          ) => {
            try {
              this.props.editUser({ username, email, phoneNumber, adress });
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
              this.props.changePasswordUser({ oldPassword, newPassword });
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
          label="Имя пользователя"
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
          label="Электронная почта"
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
        <TextField
          label="Номер телефона"
          autoComplete="tel"
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
        <TextField
          label="Ваш адрес"
          autoComplete="tel"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="adress"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.adress}
          helperText={errors.adress}
          error={Boolean(errors.adress)}
        />
        <Button
          key="submit"
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          ПОДТВЕРДИТЬ
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
          label="Текущий пароль"
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
          label="Новый пароль"
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
          label="Подтвердите пароль"
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
          ИЗМЕНИТЬ ПАРОЛЬ
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

export default withStyles(styles)(UserProfileEdit);
