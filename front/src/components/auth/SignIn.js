import React, { Component } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withSnackbar } from 'notistack';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  
  handleMessage = (msg, variant) => {
    this.props.enqueueSnackbar(msg, { variant });
  };

  handleSubmit = () => {
    fetch("http://localhost:3002/api/clients/signin", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => { 
        console.log(json);
        this.handleMessage('Вход успешный!', 'success')
      })
      .catch(() => this.handleMessage('Неверные данные', 'error'))
  }

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
          fullWidth
        />
        <Button
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          Sign In
        </Button>
      </form>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap"
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

export default withStyles(styles)(withSnackbar(SignIn));
