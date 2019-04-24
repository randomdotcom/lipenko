import { connect } from "react-redux";
import {
  loadCustomers,
  changeFiltersCustomers
} from "../../../actions/admin.actions";
import Customers from "../../../components/admin/CustomersListPage";

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
)(Customers);
