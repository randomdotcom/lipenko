import { connect } from "react-redux";
import { changeFiltersBookings } from "../../../actions/bookings.actions";
import Sort from "../../../components/profile/bookings/Sort";

const mapStateToProps = state => ({
  bookings: state.profile.bookings ? state.profile.bookings.docs : undefined,
  search: state.profile.bookings ? state.router.location.search : undefined,
  pathname: state.profile.bookings ? state.router.location.pathname : undefined
});

export default connect(
  mapStateToProps,
  { changeFiltersBookings }
)(Sort);
