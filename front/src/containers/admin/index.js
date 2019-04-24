import { connect } from "react-redux";
import { signInAdmin } from "../../actions/adminAuth.actions";
import Admin from "../../components/admin";

export default connect(
  null,
  {
    signInAdmin
  }
)(Admin);
