import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import UserSignUp from "./userSignUp";
import ExecutorSignUp from "./executorSignUp";
import { fetchRegisterUser, fetchConfirmUser } from "../../../fetches/auth";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSended: false,
      verificationCode: "",
      selectedForm: "user"
    };
  }

  fetchRegisterUser = (username, password, email, phoneNumber) => {
    fetchRegisterUser.call(this, username, password, email, phoneNumber);
    console.log(this.state.isSended)
  };

  fetchConfirmUser = () => {
    fetchConfirmUser.call(this, this.state.verificationCode);
  };

  handleMessage = (msg, variant) => {
    this.props.enqueueSnackbar(msg, { variant });
  };

  handleVerificationCodeChange = verificationCode => {
    this.setState({ verificationCode });
  };

  handleChangeRadioButton = event => {
    this.setState({ selectedForm: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <RadioGroup
          row
          aria-label="Gender"
          name="type"
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
        {this.state.selectedForm === "user" ? (
          <UserSignUp
            fetchRegisterUser={this.fetchRegisterUser}
            fetchConfirmUser={this.fetchConfirmUser}
            verificationCode={this.state.verificationCode}
            isSended={this.state.isSended}
          />
        ) : (
          <ExecutorSignUp />
        )}
      </div>
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
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "column"
  },
  button: {
    margin: theme.spacing.unit
  },
  margin: {
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
