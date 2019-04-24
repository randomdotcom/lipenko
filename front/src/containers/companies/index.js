import { connect } from "react-redux";
import {
  loadCompanies,
  changeFiltersCompanies
} from "../../actions/companies.actions";
import Companies from "../../components/companies";

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
)(Companies);
