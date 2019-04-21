import { connect } from "react-redux";
import {
  signInUser,
  userNewVerificationCode,
  confirmUser,
  authSocial
} from "../../../actions/userAuth.actions";
import {
  executorNewVerificationCode,
  signInExecutor
} from "../../../actions/executorAuth.actions";
import { returnError } from "../../../actions/events.actions";
import SignIn from "../../../components/auth/signIn";

const mapStateToProps = state => ({
  isSended: state.profile.isSended,
  username: state.profile.data ? state.profile.data.username : undefined
});

export default connect(
  mapStateToProps,
  {
    signInExecutor,
    signInUser,
    confirmUser,
    userNewVerificationCode,
    executorNewVerificationCode,
    authSocial,
    returnError
  }
)(SignIn);
