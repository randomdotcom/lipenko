import { connect } from "react-redux";
import AdminProfile from "../../components/profile/AdminProfile";
import { signOut } from "../../actions/common.actions";

const mapStateToProps = state => ({
  role: state.profile.role,
  username: state.profile.data.username,
  email: state.profile.data.email
});

export default connect(
  mapStateToProps,
  { signOut }
)(AdminProfile);
