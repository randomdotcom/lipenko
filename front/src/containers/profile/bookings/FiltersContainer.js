import { connect } from "react-redux";
import { changeFiltersBookings } from "../../../actions/bookings.actions";
import Filters from "../../../components/profile/bookings/Filters";

const mapStateToProps = state => ({
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { changeFiltersBookings }
)(Filters);
