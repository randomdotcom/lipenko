import React, { Component } from "react";
import { Formik } from "formik";
import { string, object } from "yup";
import { withStyles } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import VerificationCodeField from "../VerificationCodeField";
import GoogleAuthButton from "./GoogleAuthButton";

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

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verificationCode: "",
      selectedForm: "user"
    };
  }

  handleVerificationCodeChange = verificationCode => {
    this.setState({ verificationCode });
  };

  handleNewVerificationCode = () => {
    if (this.state.selectedForm === "user") {
      this.props.userNewVerificationCode(this.props.username);
    } else {
      this.props.executorNewVerificationCode(this.props.username);
    }
  };

  handleChangeRadioButton = event => {
    this.setState({ selectedForm: event.target.value });
  };

  handleConfirm = () => {
    this.props.confirmUser({
      username: this.props.username,
      verificationCode: this.state.verificationCode
    });
  };

  render() {
    return (
      <>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setFieldError }) => {
            try {
              if (this.state.selectedForm === "user") {
                this.props.signInUser(values.username, values.password);
              } else if (this.state.selectedForm === "executor") {
                this.props.signInExecutor(values.username, values.password);
              }
            } catch (errors) {
              console.log(errors);
              errors.forEach(err => {
                setFieldError(err.field, err.error);
              });
            }
          }}
          component={this.form}
        />
      </>
    );
  }

  form = ({ handleSubmit, handleChange, handleBlur, values, errors }) => {
    const { classes } = this.props;
    return (
      <form className={classes.container} onSubmit={handleSubmit}>
        {!this.props.isSended && (
          <>
            <RadioGroup
              row
              aria-label="Gender"
              name="type"
              className={classes.group}
              value={this.state.selectedForm}
              onChange={this.handleChangeRadioButton}
            >
              <FormControlLabel
                value="user"
                control={<Radio />}
                labelPlacement="end"
                label="Клиент"
              />
              <FormControlLabel
                value="executor"
                control={<Radio />}
                labelPlacement="end"
                label="Компания"
              />
            </RadioGroup>
            <TextField
              label="Имя пользователя"
              autoComplete="username"
              className={classes.textField}
              disabled={this.props.isSended}
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
              autoComplete="current-password"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              disabled={this.props.isSended}
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              helperText={errors.password}
              error={Boolean(errors.password)}
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
            <>
              <Button
                onClick={handleSubmit}
                type="submit"
                key="submit"
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
              >
                ВОЙТИ
              </Button>
              {this.state.selectedForm === "user" ? (
                <GoogleAuthButton
                  authSocial={this.props.authSocial}
                  returnError={this.props.authSocial}
                />
              ) : null}
            </>
          )}
        </div>
      </form>
    );
  };
}

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
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

export default withStyles(styles)(SignIn);
