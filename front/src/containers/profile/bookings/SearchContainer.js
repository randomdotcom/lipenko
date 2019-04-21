import { connect } from "react-redux";
import { changeFiltersBookings } from "../../../actions/bookings.actions";
import Search from "../../../components/profile/bookings/Search";

const mapStateToProps = state => ({
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { changeFiltersBookings }
)(Search);
