import { connect } from "react-redux";
import { changeFiltersCustomers } from "../../../actions/admin.actions";
import Filters from "../../../components/admin/CustomersListPage/Filters";

const mapStateToProps = state => ({
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { changeFiltersCustomers }
)(Filters);
