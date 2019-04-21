import { connect } from "react-redux";
import UploadLogo from "../../../components/profile/edit/UploadLogo";
import { uploadLogo } from "../../../actions/executor.actions";

const mapStateToProps = state => ({
  company: state.profile.data
});

export default connect(
  mapStateToProps,
  { uploadLogo }
)(UploadLogo);
