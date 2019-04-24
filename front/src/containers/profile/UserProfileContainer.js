import { connect } from "react-redux";
import UserProfile from "../../components/profile/UserProfile";
import { signOut } from "../../actions/common.actions";

const mapStateToProps = state => ({
  role: state.profile.role,
  username: state.profile.data.username,
  adress: state.profile.data.adress,
  email: state.profile.data.email,
  phoneNumber: state.profile.data.phoneNumber
});

export default connect(
  mapStateToProps,
  { signOut }
)(UserProfile);
 