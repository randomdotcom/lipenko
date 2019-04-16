import React, { Component } from "react";
import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import AttachMoney from '@material-ui/icons/AttachMoney';
import StarRate from '@material-ui/icons/StarRate';
import ShowChart from '@material-ui/icons/ShowChart';
import green from '@material-ui/core/colors/green';
import { connect } from "react-redux";
import {
  changeFiltersBookings
} from "../../../../actions/bookings.actions";

class Sort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: ""
    };
  }

  handleChange = event => {
    this.setState({ sortBy: event.target.value });

    const query = this.props.search;
    const path = this.props.pathname;

    this.props.changeFiltersBookings({
      query,
      name: "sortBy",
      value: event.target.value,
      path
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <RadioGroup
        row
        className={classes.group}
        value={this.state.sortBy}
        onChange={this.handleChange}
      >

        <FormControlLabel
          value="price"
          control={<Radio icon={<AttachMoney />} checkedIcon={<AttachMoney />} color="secondary" classes={{ colorSecondary: classes.radio, checked: classes.checked }} />}
        />


        <FormControlLabel
          value="time"
          control={<Radio icon={<StarRate />} checkedIcon={<StarRate />} color="secondary" classes={{ colorSecondary: classes.radio, checked: classes.checked }} />}
        />


        <FormControlLabel
          value="date"
          control={<Radio icon={<ShowChart />} checkedIcon={<ShowChart />} color="secondary" classes={{ colorSecondary: classes.radio, checked: classes.checked }} />}
        />

      </RadioGroup>
    );
  }
}

const styles = theme => ({
  group: {
    marginLeft: 35
  },
  radio: {
    transition: 'color 0.1s linear',
    '&$checked': {
      color: green[500],
    },
    '&:hover': {
      color: green[500]
    }
  },
  checked: {},
});

const mapStateToProps = state => ({
  bookings: state.profile.bookings ? state.profile.bookings.docs : undefined,
  search: state.profile.bookings ? state.router.location.search : undefined,
  pathname: state.profile.bookings ? state.router.location.pathname : undefined
});

export default connect(
  mapStateToProps,
  { changeFiltersBookings }
)(withStyles(styles)(Sort));
