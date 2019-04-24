import { connect } from "react-redux";
import { changeFiltersCompanies } from "../../actions/companies.actions";
import Search from "../../components/companies/Search";

const mapStateToProps = state => ({
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { changeFiltersCompanies }
)(Search);
