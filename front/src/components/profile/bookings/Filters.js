import React, { Component } from "react";
import { parse } from "query-string";
import {
  withStyles,
  FormControl,
  TextField,
  MenuItem,
  Select,
  InputLabel
} from "@material-ui/core";

class Filters extends Component {
  query = parse(this.props.search);

  state = {
    type: this.query.type ? this.query.type : "",
    city: this.query.city ? this.query.city : "",
    status: this.query.status ? this.query.status : ""
  };

  handleChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        console.log(this.state);
      }
    );

    const path = this.props.pathname;
    const query = this.props.search;

    this.props.changeFiltersBookings({
      query,
      name: `${event.target.name}`,
      value: event.target.value,
      path
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <TextField
          color="secondary"
          name="city"
          label="Город"
          value={this.state.city}
          onChange={this.handleChange}
          className={classes.input}
        />
        <FormControl className={classes.input}>
          <InputLabel htmlFor="status">Статус заказа</InputLabel>
          <Select
            value={this.state.status}
            onChange={this.handleChange}
            inputProps={{
              name: "status",
              id: "status"
            }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="canceled">Canceled</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.input}>
          <InputLabel htmlFor="type">Вид уборки</InputLabel>
          <Select
            value={this.state.type}
            onChange={this.handleChange}
            inputProps={{
              name: "type",
              id: "type"
            }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="standart">Standart</MenuItem>
            <MenuItem value="general">General</MenuItem>
            <MenuItem value="afterRepair">After repair</MenuItem>
            <MenuItem value="office">Office</MenuItem>
            <MenuItem value="industrial">Industrial</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing.unit
  },
  input: {
    margin: theme.spacing.unit,
    marginLeft: 0
  }
});

export default withStyles(styles)(Filters);
