import { connect } from "react-redux";
import App from '../components/App'

const mapStateToProps = state => ({
  isAuthenticated: state.profile.isAuthenticated,
  role: state.profile.role
});

export default connect(mapStateToProps)(App);
