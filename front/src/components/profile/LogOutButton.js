import React from 'react';
import { Button } from '@material-ui/core';
import { signOut } from '../../actions/auth.actions'
import {connect} from 'react-redux'

function LogOutButton(props) {
    return <Button variant="contained" onClick={props.signOut} >Log Out</Button>
}

export default connect(null, { signOut })(LogOutButton)