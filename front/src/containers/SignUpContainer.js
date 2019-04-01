import { connect } from "react-redux";
import SignUp from "../components/auth/SignUp/";
import { signInUser, signInExecutor } from "../actions/userActions";

const mapStateToProps = state => ({
  user: state.user,
  executor: state.executor
});

const mapDispatchToProps = dispatch => {
  return {
    signInUser: user => dispatch(signInUser(user)),
    signInExecutor: executor => dispatch(signInExecutor(executor))
  };
};

const SignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

export default SignUpContainer;
