import { connect } from "react-redux";
import SignIn from "../components/auth/SignIn";
import { signIn } from "../actions/userActions";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    signIn: user => dispatch(signIn(user))
  };
};

const SignInContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignIn);

export default SignInContainer;
