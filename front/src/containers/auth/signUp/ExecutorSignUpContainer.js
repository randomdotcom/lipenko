import { connect } from "react-redux";
import {
  signUpExecutor,
  executorNewVerificationCode
} from "../../../actions/executorAuth.actions.js";
import ExecutorSignUp from "../../../components/auth/signUp/ExecutorSignUp";

const mapStateToProps = state => ({
  isSended: state.profile.isSended,
  username: state.profile.data
    ? state.profile.data.username
      ? state.profile.data.username
      : undefined
    : undefined
});

export default connect(
  mapStateToProps,
  { signUpExecutor, executorNewVerificationCode }
)(ExecutorSignUp);
