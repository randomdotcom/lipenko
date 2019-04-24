import { connect } from "react-redux";
import {
  resetSelectedCompany,
  calculateTimePrice
} from "../../actions/order.actions";
import BookingForm from "../../components/book/BookingForm";

const mapStateToProps = state => ({
  company: state.order.company ? state.order.company : undefined,
  isAuthenticated: state.profile.isAuthenticated,
  availableWorkingDays: state.order.company
    ? state.order.availableWorkingDays
    : undefined,
  typesOfCleaning: state.order.typesOfCleaning,
  price: state.order.price ? state.order.price : undefined,
  time: state.order.time ? state.order.time : undefined
});

export default connect(
  mapStateToProps,
  { resetSelectedCompany, calculateTimePrice }
)(BookingForm);
