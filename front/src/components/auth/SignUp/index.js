import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import UserSignUp from "./userSignUp";
import ExecutorSignUp from "./executorSignUp";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedForm: "user"
    };
  }

  handleMessage = (msg, variant) => {
    this.props.enqueueSnackbar(msg, { variant });
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
          <UserSignUp signIn={this.props.signIn}/>
        ) : (
          <ExecutorSignUp />
        )}
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
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

export default withStyles(styles)(SignUp);
