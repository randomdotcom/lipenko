import { connect } from "react-redux";
import Header from "../components/header";

const mapStateToProps = state => ({
  isAuthenticated: state.profile.isAuthenticated,
  role: state.profile.role,
  username:
    state.profile.isAuthenticated === true
      ? state.profile.data.username
      : undefined
});

export default connect(mapStateToProps)(Header);
