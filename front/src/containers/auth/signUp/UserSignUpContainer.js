import { connect } from "react-redux";
import {
  signUpUser,
  confirmUser,
  userNewVerificationCode
} from "../../../actions/userAuth.actions";
import UserSignUp from "../../../components/auth/signUp/UserSignUp";

const mapStateToProps = state => ({
  isSended: state.profile.isSended,
  username: state.profile.data ? state.profile.data.username : undefined
});

export default connect(
  mapStateToProps,
  { signUpUser, confirmUser, userNewVerificationCode }
)(UserSignUp);
