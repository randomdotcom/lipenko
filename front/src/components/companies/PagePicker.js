import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadCompanies,
  changeFiltersCompanies
} from "../../actions/companies.actions";
import Select from "rc-select";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import "rc-select/assets/index.css";

class PagePicker extends Component {
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

  render() {
    return (
      <Pagination
        selectComponentClass={Select}
        showQuickJumper
        showSizeChanger
        pageSize={this.props.limit}
        pageSizeOptions={[5, 10, 15, 20]}
        defaultCurrent={1}
        currrent={this.props.page}
        onShowSizeChange={this.pageSizeChange}
        onChange={this.loadCompanies}
        total={this.props.total}
        locale={localeInfo}
      />
    );
  }
}

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
)(PagePicker);
