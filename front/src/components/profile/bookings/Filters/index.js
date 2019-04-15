import React, { Component } from "react";
import { connect } from "react-redux";
import { parse } from "query-string";
import {
  withStyles,
  FormControl,
  FormLabel,
  TextField,
  MenuItem,
  Select
} from "@material-ui/core";
import { changeFiltersBookings } from "../../../../actions/bookings.actions";

class Filters extends Component {
  query = parse(this.props.search);

  state = {
    type: this.query.type ? this.query.type : "",
    city: this.query.city ? this.query.city : ""
  };

  handleChangeType = event => {
    this.setState({ type: event.target.value });

    const path = this.props.pathname;
    const query = this.props.search;

    this.props.changeFiltersBookings({
      query,
      name: "type",
      value: event.target.value,
      path
    });
  };

  // handleChangeCity = event => {
  //   this.setState({ city: event.target.value });

  //   const path = this.props.pathname;
  //   const query = this.props.search;

  //   this.props.changeFiltersBookings({
  //     query,
  //     name: "city",
  //     value: event.target.value,
  //     path
  //   });
  // };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });

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
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" />
        <TextField
          color="secondary"
          name="city"
          label="City"
          value={this.state.city}
          onChange={this.handleChange}
          className={classes.city}
        />
        <Select
          value={this.state.type}
          onChange={this.handleChange}
          inputProps={{
            name: "type"
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
  radio: {
    padding: 0,
    margin: theme.spacing.unit / 2,
    marginRight: 12
  },
  checkbox: {},
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  city: {
    marginBottom: 10
  }
});

const mapStateToProps = state => ({
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { changeFiltersBookings }
)(withStyles(styles)(Filters));
