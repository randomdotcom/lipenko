import { connect } from "react-redux";
import { changeFiltersCompanies } from "../../actions/companies.actions";
import Sort from "../../components/companies/Sort";

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
  { changeFiltersCompanies }
)(Sort);
