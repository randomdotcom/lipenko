import React, { Component } from "react";
import { connect } from "react-redux";
import { parse } from "query-string";
import {
  withStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  TextField
} from "@material-ui/core";
import { changeFiltersCompanies } from "../../../actions/companies.actions";

class Filters extends Component {
  query = parse(this.props.search);

  state = {
    type: this.query.type ? this.query.type : '',
    carpet: this.query.carpet ? true : false,
    furniture: this.query.furniture ? true : false,
    pool: this.query.pool ? true : false,
    city: this.query.city ? this.query.city : ''
  };

  handleChangeType = event => {
    this.setState({ type: event.target.value });

    const path = this.props.pathname;
    const query = this.props.search;

    this.props.changeFiltersCompanies({
      query,
      name: "type",
      value: event.target.value,
      path
    });
  };

  handleChangeCity = event => {
    this.setState({ city: event.target.value });

    const path = this.props.pathname;
    const query = this.props.search;

    this.props.changeFiltersCompanies({
      query,
      name: "city",
      value: event.target.value,
      path
    });
  };

  handleChangeSecondaryCallback = name => {
    const path = this.props.pathname;
    const query = this.props.search;

    if (this.state[name] === true) {
      this.props.changeFiltersCompanies({
        query,
        name: `${name}`,
        value: true,
        path
      });
    } else {
      this.props.changeFiltersCompanies({
        query,
        name: `${name}`,
        value: undefined,
        path
      });
    }
  };

  handleChangeSecondary = name => event => {
    this.setState({ [name]: !this.state[name] }, () =>
      this.handleChangeSecondaryCallback(name)
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend"></FormLabel>
        <TextField
          color="secondary"
          label="City"
          value={this.state.city}
          onChange={this.handleChangeCity}
          className={classes.city}
        />
        <FormLabel component="legend">Type of cleaning</FormLabel>
        <RadioGroup
          className={classes.group}
          value={this.state.type}
          onChange={this.handleChangeType}
        >
          <FormControlLabel
            value="standart"
            control={<Radio color="secondary" className={classes.radio} />}
            label="Standart"
            labelPlacement="start"
          />
          <FormControlLabel
            value="general"
            control={<Radio color="secondary" className={classes.radio} />}
            label="General"
            labelPlacement="start"
          />
          <FormControlLabel
            value="afterRepair"
            control={<Radio color="secondary" className={classes.radio} />}
            label="After repair"
            labelPlacement="start"
          />
          <FormControlLabel
            value="industrial"
            control={<Radio color="secondary" className={classes.radio} />}
            label="Industrial"
            labelPlacement="start"
          />
          <FormControlLabel
            value="office"
            control={<Radio color="secondary" className={classes.radio} />}
            label="Office"
            labelPlacement="start"
          />
        </RadioGroup>
        <FormLabel className={classes.group} component="legend">
          Other cleanings
        </FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.carpet}
              onChange={this.handleChangeSecondary("carpet")}
              className={classes.padding}
            />
          }
          label="Carpet"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.furniture}
              onChange={this.handleChangeSecondary("furniture")}
              className={classes.checkbox}
            />
          }
          label="Furniture"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.pool}
              onChange={this.handleChangeSecondary("pool")}
              className={classes.checkbox}
            />
          }
          label="Pool"
          labelPlacement="start"
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
  { changeFiltersCompanies }
)(withStyles(styles)(Filters));
