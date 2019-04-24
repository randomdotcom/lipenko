import { connect } from 'react-redux'
import ProfileEdit from '../../../components/profile/edit'

const mapStateToProps = state => ({
  role: state.profile.role
});

export default connect(mapStateToProps)(ProfileEdit)