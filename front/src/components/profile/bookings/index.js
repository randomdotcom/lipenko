import React, { Component } from "react";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core";
import PagePicker from "../../common/PagePicker";
import BookingsList from "./BookingsList";
import Filters from "../../../containers/profile/bookings/FiltersContainer";
import Search from "../../../containers/profile/bookings/SearchContainer";
import Sort from "../../../containers/profile/bookings/SortContainer";
import Loading from "../../common/Loading";

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
              ) : (
                <Loading />
              )}
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

export default withStyles(styles)(Bookings);
