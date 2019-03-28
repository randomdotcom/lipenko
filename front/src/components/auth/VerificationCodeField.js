import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import green from "@material-ui/core/colors/green";
import { withStyles } from "@material-ui/core/styles";

class VerificationCodeField extends Component {
  handleChange = event => {
    this.props.handleChange(event.target.value);
  };

  render() {
    const { classes } = this.props;
    const { verificationCode } = this.props;

    return (
      <FormControl className={classes.margin}>
        <InputLabel
          htmlFor="verificationCode"
          classes={{
            root: classes.cssLabel,
            focused: classes.cssFocused
          }}
        >
          verification code
        </InputLabel>
        <Input
          value={verificationCode}
          onChange={this.handleChange}
          id="verificationCode"
          classes={{
            underline: classes.cssUnderline
          }}
        />
      </FormControl>
    );
  }
}

const styles = theme => ({
  margin: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150
  },
  cssLabel: {
    "&$cssFocused": {
      color: green[500]
    }
  },
  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: green[500]
    }
  }
});

export default withStyles(styles)(VerificationCodeField);
