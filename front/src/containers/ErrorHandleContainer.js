import { connect } from "react-redux";
import { clearError } from "../actions/events.actions";
import ErrorHandle from "../components/ErrorHandle";

const mapStateToProps = state => ({
  error: state.events.error
});

export default connect(
  mapStateToProps,
  { clearError }
)(ErrorHandle);
