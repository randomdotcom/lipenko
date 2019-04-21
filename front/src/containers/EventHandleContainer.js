import { connect } from "react-redux";
import { clearEvent } from "../actions/events.actions";
import EventHandle from "../components/EventHandle";

const mapStateToProps = state => ({
  event: state.events.event,
  variant: state.events.variant
});

export default connect(
  mapStateToProps,
  { clearEvent }
)(EventHandle);
