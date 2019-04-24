import { connect } from "react-redux";
import { editAdmin, changePasswordAdmin } from "../../../actions/admin.actions";
import AdminProfileEdit from "../../../components/profile/edit/AdminProfileEdit";

const mapStateToProps = state => ({
  role: state.profile.role,
  username: state.profile.data.username,
  adress: state.profile.data.adress,
  email: state.profile.data.email,
  phoneNumber: state.profile.data.phoneNumber
});

export default connect(
  mapStateToProps,
  { editAdmin, changePasswordAdmin }
)(AdminProfileEdit);
