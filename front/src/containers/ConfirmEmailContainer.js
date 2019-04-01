import { connect } from "react-redux";
import ConfirmEmail from "../components/auth/ConfirmEmail"
import { signInExecutor } from "../actions/userActions";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    signInExecutor: executor => dispatch(signInExecutor(executor))
  };
};

const ConfirmEmailContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConfirmEmail);

export default ConfirmEmailContainer;
