import React, { Component } from "react";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core";
import PagePicker from "../../common/PagePicker";
import CustomersList from "./CustomersList";
import Filters from "../../../containers/admin/CustomersListPage/FiltersContainer";

class Customers extends Component {
  componentDidMount() {
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

export default withStyles(styles)(Customers);
