import React, { Component } from "react";
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

class Filters extends Component {
  query = parse(this.props.search);

  state = {
    type: this.query.type ? this.query.type : "",
    carpet: this.query.carpet ? true : false,
    furniture: this.query.furniture ? true : false,
    pool: this.query.pool ? true : false,
    city: this.query.city ? this.query.city : ""
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
        <FormLabel component="legend" />
        <TextField
          color="secondary"
          label="Город"
          value={this.state.city}
          onChange={this.handleChangeCity}
          className={classes.city}
        />
        <FormLabel component="legend">Вид уборки</FormLabel>
        <RadioGroup
          className={classes.group}
          value={this.state.type}
          onChange={this.handleChangeType}
        >
          <FormControlLabel
            value="standart"
            control={<Radio color="secondary" className={classes.radio} />}
            label="Обычная"
            labelPlacement="start"
          />
          <FormControlLabel
            value="general"
            control={<Radio color="secondary" className={classes.radio} />}
            label="Генеральная"
            labelPlacement="start"
          />
          <FormControlLabel
            value="afterRepair"
            control={<Radio color="secondary" className={classes.radio} />}
            label="После ремонта"
            labelPlacement="start"
          />
          <FormControlLabel
            value="industrial"
            control={<Radio color="secondary" className={classes.radio} />}
            label="Промышленная"
            labelPlacement="start"
          />
          <FormControlLabel
            value="office"
            control={<Radio color="secondary" className={classes.radio} />}
            label="Чистка офиса"
            labelPlacement="start"
          />
        </RadioGroup>
        <FormLabel className={classes.group} component="legend">
          Другое
        </FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.carpet}
              onChange={this.handleChangeSecondary("carpet")}
              className={classes.padding}
            />
          }
          label="Чистка ковров"
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
          label="Чистка мебели"
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
          label="Чистка бассейнов"
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
    minWidth: 180
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

export default withStyles(styles)(Filters);
