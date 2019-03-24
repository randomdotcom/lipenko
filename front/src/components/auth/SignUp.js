import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(this.state[name]);
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label="Username"
          className={classes.textField}
          onChange={this.handleChange("username")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          className={classes.textField}
          onChange={this.handleChange("password")}
          margin="normal"
          variant="outlined"
          type="password"
        />
        <TextField
          label="Email"
          className={classes.textField}
          onChange={this.handleChange("email")}
          margin="normal"
          variant="outlined"
          type="email"
        />
      </form>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

export default withStyles(styles)(SignUp);
