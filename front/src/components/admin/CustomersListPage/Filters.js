import React, { Component } from "react";
import { parse } from "query-string";
import {
  withStyles,
  FormControl,
  FormLabel,
  TextField
} from "@material-ui/core";

class Filters extends Component {
  query = parse(this.props.search);

  state = {
    username: this.query.username ? this.query.username : "",
    adress: this.query.adress ? this.query.adress : "",
    email: this.query.email ? this.query.email : "",
    phone: this.query.phone ? this.query.phone : ""
  };

  handleChangeQuery = event => {
    this.setState({
      [event.target.name]: event.target.value
    });

    const path = this.props.pathname;
    const query = this.props.search;

    this.props.changeFiltersCustomers({
      query,
      name: `${event.target.name}`,
      value: event.target.value,
      path
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" />
        <TextField
          color="secondary"
          label="Логин"
          name="username"
          value={this.state.username}
          onChange={this.handleChangeQuery}
          className={classes.textfield}
        />
        <TextField
          color="secondary"
          label="Эл. почта"
          name="email"
          value={this.state.email}
          onChange={this.handleChangeQuery}
          className={classes.textfield}
        />
        <TextField
          color="secondary"
          label="Адрес"
          name="adress"
          value={this.state.adress}
          onChange={this.handleChangeQuery}
          className={classes.textfield}
        />
        <TextField
          color="secondary"
          label="Номер телефона"
          name="phone"
          value={this.state.phone}
          onChange={this.handleChangeQuery}
          className={classes.textfield}
        />
      </FormControl>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    minWidth: 120
  },
  textfield: {
    marginBottom: 10
  }
});

export default withStyles(styles)(Filters);
