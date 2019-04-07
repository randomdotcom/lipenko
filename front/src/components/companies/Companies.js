import React, { Component } from "react";
//import PagePicker from "./PagePicker";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core";
//import CompaniesList from "./CompaniesList";
import CompanyCard from "./CompanyCard";
import { connect } from "react-redux";
import Select from "rc-select";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import "rc-select/assets/index.css";
import {
  loadCompanies,
  changeFiltersCompanies
} from "../../actions/companies.actions";

const CompaniesList = ({ companies }) => {
  if (companies[0] === undefined) {
    return <p>Loading</p>
  } else {
    return companies.map(company => <CompanyCard company={company} key={company._id} />);
  }
};

class Companies extends Component {
  componentWillMount() {
    this.props.loadCompanies(this.props.search);
  }

  pageSizeChange = (current, size) => {
    const query = this.props.search;
    const path = this.props.pathname;

    this.props.changeFiltersCompanies({
      query,
      name: "perPage",
      value: size,
      path
    });
  };

  handlePageChange = (current) => {
    const query = this.props.search;
    const path = this.props.pathname;

    this.props.changeFiltersCompanies({
      query,
      name: "page",
      value: current,
      path
    });
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.companies);
    return (
      <>
        <List className={classes.root}>
          <CompaniesList companies={this.props.companies} />
        </List>
        <Pagination
          selectComponentClass={Select}
          showQuickJumper
          showSizeChanger
          pageSize={this.props.limit}
          pageSizeOptions={["5", "10", "15", "20"]}
          defaultCurrent={1}
          currrent={this.props.page}
          onShowSizeChange={this.pageSizeChange}
          onChange={this.handlePageChange}
          total={this.props.total}
          locale={localeInfo}
        />
      </>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});

const mapStateToProps = state => ({
  companies: state.companies.docs,
  total: state.companies.total,
  page: state.companies.page,
  limit: state.companies.limit,
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { loadCompanies, changeFiltersCompanies }
)(withStyles(styles)(Companies));
