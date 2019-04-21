import { connect } from "react-redux";
import Profile from "../../components/profile";

const mapStateToProps = state => ({
  role: state.profile.role
});

export default connect(mapStateToProps)(Profile);
