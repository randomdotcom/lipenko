import React, { Component } from "react";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core";
import PagePicker from "../common/PagePicker";
import CompaniesList from "./CompaniesList";
import Filters from "../../containers/companies/FiltersContainer";
import Search from "../../containers/companies/SearchContainer";
import Sort from "../../containers/companies/SortContainer";
import Loading from "../common/Loading";
import "./styles.css";

class Companies extends Component {
  componentDidMount() {
    this.props.loadCompanies(this.props.search, this.props.userRole);
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
        <Search />
        <div className="listAndFilters">
          <div className={classes.sortAndList}>
            <Sort />
            <List className={classes.list}>
              {!!this.props.companies ? (
                <CompaniesList
                  companies={this.props.companies}
                  role={this.props.role}
                />
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
    border: "1px solid #dedede",
    boxShadow: "0px 0px 25px 5px rgba(0,0,0,0.1)",
    padding: 25,
    paddingTop: 8,
    height: "100%"
  },
  listAndFilters: {},
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

export default withStyles(styles)(Companies);
