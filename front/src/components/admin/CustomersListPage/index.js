import React, { Component } from "react";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core";
import PagePicker from "./PagePicker";
import { connect } from "react-redux";
import {
  loadCustomers,
  changeFiltersCustomers
} from "../../../actions/admin.actions";
import CustomersList from "./CustomersList";
import Filters from "./Filters";

class Customers extends Component {
  componentDidMount() {
    console.log("dsdss");
    this.props.loadCustomers(this.props.search);
  }

  handleQueryChange = current => {
    const query = this.props.search;
    const path = this.props.pathname;

    this.props.changeFiltersCompanies({
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
        {/* <Search /> */}
        <div className={classes.listAndFilters}>
          <div className={classes.sortAndList}>
            {/* <Sort /> */}
            <List className={classes.list}>
              {this.props.customers ? (
                <CustomersList
                  customers={this.props.customers}
                  role={this.props.role}
                />
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
  customers: state.admin.customers ? state.admin.customers.docs : undefined,
  total: state.admin.customers ? state.admin.customers.total : undefined,
  page: state.admin.customers ? state.admin.customers.page : undefined,
  limit: state.admin.customers ? state.admin.customers.limit : undefined,
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { loadCustomers, changeFiltersCustomers }
)(withStyles(styles)(Customers));
