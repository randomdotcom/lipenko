import React, { Component } from "react";
import { Formik } from "formik";
import { string, object } from "yup";
import { TextField, withStyles, Button } from "@material-ui/core";
import teal from "@material-ui/core/colors/teal";
import VerificationCodeField from "../../../components/auth/VerificationCodeField";

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
    .matches(/^[\S]{5,18}$/, "Пароль не может содержать пробелы"),
  confirmPassword: string()
    .required("Введите свой пароль еще раз")
    .test("passwords-match", "Пароли не совпадают", function (value) {
      return this.parent.password === value;
    }),
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

class UserSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verificationCode: "",
      isSended: false
    };
  }

  handleMessage = (msg, variant) => {
    this.props.enqueueSnackbar(msg, { variant });
  };

  handleVerificationCodeChange = code => {
    this.setState({ verificationCode: code });
  };

  handleNewVerificationCode = () => {
    this.props.userNewVerificationCode(this.props.username);
  };

  handleConfirm = () => {
    this.props.confirmUser({
      username: this.props.username,
      verificationCode: this.state.verificationCode
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Formik
          initialValues={{
            username: "",
            password: "",
            email: "",
            phoneNumber: ""
          }}
          onSubmit={(values, { setFieldError }) => {
            try {
              this.props.signUpUser(values);
            } catch (errors) {
              errors.forEach(err => {
                setFieldError(err.field, err.error);
              });
            }
          }}
          validationSchema={validationSchema}
          render={({
            values,
            errors,
            handleBlur,
            handleChange,
            handleSubmit
          }) => (
            <form
              className={classes.container}
              onSubmit={handleSubmit}
              noValidate
            >
              {!this.props.isSended && (
                <>
                  <TextField
                    label="Имя пользователя"
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
                    label="Пароль"
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
                    label="Подтвердите пароль"
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
                    label="Электронная почта"
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
                    label="Номер телефона"
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
                  <TextField
                    label="Ваш адрес"
                    autoComplete="tel"
                    disabled={this.props.isSended}
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
                </>
              )}
              <div className={classes.VerifyAndConfirmContainer}>
                {this.props.isSended && (
                  <>
                    <VerificationCodeField
                      value={this.state.verificationCode}
                      handleChange={this.handleVerificationCodeChange}
                    />
                    <Button
                      onClick={this.handleConfirm}
                      key="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.confirmButton}
                    >
                      CONFIRM
                    </Button>
                    <Button
                      size="small"
                      onClick={this.handleNewVerificationCode}
                      className={classes.margin}
                    >
                      Отправить ещё раз
                    </Button>
                  </>
                )}
                {!this.props.isSended && (
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    key="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                  >
                    ЗАРЕГИСТРИРОВАТЬСЯ
                  </Button>
                )}
              </div>
            </form>
          )}
        />
      </>
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
  confirmButton: {
    margin: theme.spacing.unit,
    backgroundColor: teal[500],
    "&:hover": {
      backgroundColor: teal[300]
    }
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

export default withStyles(styles)(UserSignUp);
