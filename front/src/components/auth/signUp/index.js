import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import UserSignUpContainer from "./UserSignUpContainer";
import ExecutorSignUpContainer from "./ExecutorSignUpContainer";

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
        {!this.props.isSended && (
          <>
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
          </>
        )}
        {this.state.selectedForm === "user" ? (
          <UserSignUpContainer />
        ) : (
          <ExecutorSignUpContainer />
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

const mapStateToProps = state => ({
  isSended: state.profile.isSended
});

const SignUpContainer = connect(mapStateToProps)(SignUp);

export default withStyles(styles)(SignUpContainer);
