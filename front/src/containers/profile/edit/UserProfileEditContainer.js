import { connect } from "react-redux";
import { editUser, changePasswordUser } from "../../../actions/user.actions";
import UserProfileEdit from "../../../components/profile/edit/UserProfileEdit";

const mapStateToProps = state => ({
  role: state.profile.role,
  username: state.profile.data.username,
  adress: state.profile.data.adress,
  email: state.profile.data.email,
  phoneNumber: state.profile.data.phoneNumber
});

export default connect(
  mapStateToProps,
  { editUser, changePasswordUser }
)(UserProfileEdit);
