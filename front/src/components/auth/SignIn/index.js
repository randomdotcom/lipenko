import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withSnackbar } from "notistack";
import VerificationCodeField from "../VerificationCodeField";
import {
  fetchConfirmUser,
  fetchSignInUser,
  fetchSignInExecutor
} from "../../../fetches/auth/";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Formik } from "formik";
import { string, object } from "yup";

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

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVerified: true,
      isSended: false,
      verificationCode: "",
      selectedForm: "user"
    };
  }

  handleMessage = (msg, variant) => {
    this.props.enqueueSnackbar(msg, { variant });
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
    return (
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setFieldError }) => {
          try {
            if (!this.state.isSended) {
              if (this.state.selectedForm === "user") {
                fetchSignInUser.call(this, values.username, values.password);
              } else if (this.state.selectedForm === "executor") {
                fetchSignInExecutor.call(this, values.username, values.password);
              } else {
                this.handleMessage("Не выбран ни один radiobutton??", "error");
              }
            } else {
              fetchConfirmUser.call(this, this.state.verificationCode);
            }
          } catch (errors) {
            errors.forEach(err => {
              setFieldError(err.field, err.error);
            });
          }
        }}
        component={this.form}
      />
    );
  }

  form = ({ handleSubmit, handleChange, handleBlur, values, errors }) => {
    const { classes } = this.props;
    return (
      <form className={classes.container} onSubmit={handleSubmit} noValidate>
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
          disabled={!this.state.isVerified}
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
          autoComplete="current-password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          disabled={!this.state.isVerified}
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          helperText={errors.password}
          error={Boolean(errors.password)}
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
            type="submit"
            key="submit"
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
  };
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