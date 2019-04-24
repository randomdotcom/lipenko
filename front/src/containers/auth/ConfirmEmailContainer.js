import { connect } from "react-redux";
import { confirmExecutor } from "../../actions/executorAuth.actions";
import ConfirmEmail from "../../components/auth/ConfirmEmail";

const mapStateToProps = state => ({
  isAuthenticated: state.profile.isAuthenticated
});

export default connect(
  mapStateToProps,
  { confirmExecutor }
)(ConfirmEmail);
