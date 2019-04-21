import { connect } from "react-redux";
import {
  lookOffers,
  bookCleaning,
  resetSelectedCompany
} from "../../actions/order.actions";
import Book from "../../components/book";

const mapStateToProps = state => ({
  city: state.order.city ? state.order.city : undefined,
  adress: state.order.adress ? state.order.adress : undefined,
  type: state.order.type ? state.order.type : undefined,
  squareMeters: state.order.squareMeters ? state.order.squareMeters : undefined,
  smallRooms: state.order.smallRooms ? state.order.smallRooms : undefined,
  bigRooms: state.order.bigRooms ? state.order.bigRooms : undefined,
  bathRooms: state.order.bathRooms ? state.order.bathRooms : undefined,
  service: state.order.service ? state.order.service : undefined,
  smallCarpets: state.order.smallCarpets ? state.order.smallCarpets : undefined,
  bigCarpets: state.order.bigCarpets ? state.order.bigCarpets : undefined,
  startDate: state.order.startDate ? state.order.startDate : undefined,
  expectedTime: state.order.expectedTime ? state.order.expectedTime : undefined,
  cleaningDays: state.order.cleaningDays ? state.order.cleaningDays : undefined,
  regularity: state.order.regularity ? state.order.regularity : undefined,
  recurrence: state.order.recurrence ? state.order.recurrence : undefined,
  email: state.profile.data.email
    ? state.profile.data.email
    : state.order.email
    ? state.order.email
    : undefined,
  company: state.order.company ? state.order.company : undefined,
  availableWorkingDays: state.order.company
    ? state.order.availableWorkingDays
    : undefined,
  customer: state.profile.data._id ? state.profile.data._id : undefined
});

export default connect(
  mapStateToProps,
  { lookOffers, bookCleaning, resetSelectedCompany }
)(Book);
