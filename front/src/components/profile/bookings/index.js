import React, { Component } from "react";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core";
import PagePicker from "./PagePicker";
import { connect } from "react-redux";
import {
  loadBookings,
  changeFiltersBookings
} from "../../../actions/bookings.actions";
import BookingsList from "./BookingsList";
import Filters from "./Filters";
import Search from "./Search";
import Sort from "./Sort";

class Bookings extends Component {
  componentDidMount() {
    this.props.loadBookings(this.props.search);
  }

  handleQueryChange = current => {
    const query = this.props.search;
    const path = this.props.pathname;

    this.props.changeFiltersBookings({
      query,
      name: "page",
      value: current,
      path
    });
  };

  render() {
    const { classes, page, limit, total } = this.props;
    return (
      <div className={classes.root}>
        <Search />
        <div className={classes.listAndFilters}>
          <div className={classes.sortAndList}>
            <Sort />
            <List className={classes.list}>
              {this.props.bookings ? (
                <BookingsList bookings={this.props.bookings} />
              ) : null}
            </List>
          </div>
          <Filters />
        </div>
        <PagePicker
          page={page}
          limit={limit}
          total={total}
          handleQueryChange={this.handleQueryChange}
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    marginTop: 20,
    backgroundColor: "whitesmoke",
    boxShadow: "0 1px 7px 1px rgba(0, 0, 0, .25)",
    padding: 25,
    paddingTop: 8
  },
  listAndFilters: {
    display: "flex",
    justifyContent: "space-between"
  },
  list: {
    width: "100%",
    paddingTop: 0
  },
  inline: {
    display: "inline"
  },
  sortAndList: {
    width: "100%"
  }
});

const mapStateToProps = state => ({
  bookings: state.profile.bookings ? state.profile.bookings.docs : undefined,
  total: state.profile.bookings ? state.profile.bookings.total : undefined,
  page: state.profile.bookings ? state.profile.bookings.page : undefined,
  limit: state.profile.bookings ? state.profile.bookings.limit : undefined,
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { loadBookings, changeFiltersBookings }
)(withStyles(styles)(Bookings));
