import { connect } from "react-redux";
import { changeFiltersCompanies } from "../../actions/companies.actions";
import Filters from "../../components/companies/Filters";

const mapStateToProps = state => ({
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { changeFiltersCompanies }
)(Filters);
