import { connect } from "react-redux";
import SignUp from "../components/auth/SignUp";

const mapStateToProps = state => ({
  ...state
});

const SignUpContainer = connect(mapStateToProps)(SignUp);

export default SignUpContainer;
