import { connect } from "react-redux";
import SignUp from "../../../components/auth/signUp";

const mapStateToProps = state => ({
  isSended: state.profile.isSended
});

export default connect(mapStateToProps)(SignUp);
