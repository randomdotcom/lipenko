import React from "react";
import {connect } from 'react-redux'
import UserProfileEdit from './UserProfileEdit'
//import ExecutorProfileEdit from './ExecutorProfileEdit'

function ProfileEdit(props) {
//   if (props.role === 'user') {
  return <UserProfileEdit />
//   } else if (props.role === 'executor' )
//   return <ExecutorProfileEdit />
}

const mapStateToProps = state => ({
  role: state.profile.role
});

export default connect(mapStateToProps)(ProfileEdit)