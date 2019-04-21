import { connect } from "react-redux";
import { blockCustomer, unblockCustomer } from "../../../actions/admin.actions";
import CustomerCard from "../../../components/admin/CustomersListPage/CustomersList/CustomerCard";

const mapStateToProps = state => ({
  search: state.router.location.search
});

export default connect(
  mapStateToProps,
  { unblockCustomer, blockCustomer }
)(CustomerCard);
