import { connect } from "react-redux";
import { acceptBook } from "../../../actions/executor.actions";
import { cancelBook } from "../../../actions/common.actions";
import { confirmBook } from "../../../actions/user.actions";
import BookingCard from "../../../components/profile/bookings/BookingsList/BookingCard";

const mapStateToProps = state => ({
  role: state.profile.role,
  search: state.router.location.search
});

export default connect(
  mapStateToProps,
  { acceptBook, cancelBook, confirmBook }
)(BookingCard);
