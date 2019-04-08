import React, { Component } from "react";
import {
  withStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@material-ui/core";

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "standart",
      carpet: true,
      furniture: true,
      pool: false
    };
  }

  handleChangeType = event => {
    this.setState({ type: event.target.value });
  };

  handleChangeSecondary = name => event => {
    this.setState({ [name]: !this.state[name] });
  };

  render() {
    const { classes, handleQueryChange } = this.props;
    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Type of cleaning</FormLabel>
        <RadioGroup
          className={classes.group}
          value={this.state.type}
          onChange={this.handleChangeType}
        >
          <FormControlLabel
            value="standart"
            control={<Radio color="secondary" className={classes.padding} />}
            label="Standart"
            labelPlacement="start"
          />
          <FormControlLabel
            value="general"
            control={<Radio color="secondary" className={classes.padding} />}
            label="General"
            labelPlacement="start"
          />
          <FormControlLabel
            value="afterRepair"
            control={<Radio color="secondary" className={classes.padding} />}
            label="After repair"
            labelPlacement="start"
          />
          <FormControlLabel
            value="industrial"
            control={<Radio color="secondary" className={classes.padding} />}
            label="Industrial"
            labelPlacement="start"
          />
          <FormControlLabel
            value="office"
            control={<Radio color="secondary" className={classes.padding} />}
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
          label="Carpet cleaning"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.furniture}
              onChange={this.handleChangeSecondary("furniture")}
              className={classes.padding}
            />
          }
          label="Furniture cleaning"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.pool}
              onChange={this.handleChangeSecondary("pool")}
              className={classes.padding}
            />
          }
          label="Pool cleaning"
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
    marginTop: theme.spacing.unit * 3
  },
  padding: {
    padding: theme.spacing.unit / 2,
    paddingRight: theme.spacing.unit * 2
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

export default withStyles(styles)(Filters);
