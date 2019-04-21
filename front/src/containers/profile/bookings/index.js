import { connect } from "react-redux";
import {
  loadBookings,
  changeFiltersBookings
} from "../../../actions/bookings.actions";
import Bookings from "../../../components/profile/bookings";

const mapStateToProps = state => ({
  bookings: state.profile.bookings ? state.profile.bookings.docs : undefined,
  total: state.profile.bookings ? state.profile.bookings.total : undefined,
  page: state.profile.bookings ? state.profile.bookings.page : undefined,
  limit: state.profile.bookings ? state.profile.bookings.limit : undefined,
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { loadBookings, changeFiltersBookings }
)(Bookings);
