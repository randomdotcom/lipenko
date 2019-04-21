import { connect } from "react-redux";
import Auth from "../../components/auth";

const mapStateToProps = state => ({
  isAuthenticate: state.profile.isAuthenticate
});

export default connect(mapStateToProps)(Auth);
