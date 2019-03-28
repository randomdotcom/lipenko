import { connect } from "react-redux";
import SignUp from "../components/auth/SignUp";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  ...state
});

const SignUpContainer = withRouter(connect(mapStateToProps)(SignUp));

export default SignUpContainer;
