import { connect } from 'react-redux'
import { createUser } from '../actions/userActions'
import SignUp from '../components/auth/SignUp'

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    createUser: user => dispatch(createUser(user))
});

const SignUpContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp)

export default SignUpContainer


