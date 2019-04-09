import React from "react";
import {connect } from 'react-redux'
import UserProfile from './userProfile'
import ExecutorProfile from './executorProfile'

function Profile(props) {
  if (props.role === 'user') {
  return <UserProfile />
  } else if (props.role === 'executor' )
  return <ExecutorProfile />
}

const mapStateToProps = state => ({
  role: state.profile.role
});

export default connect(mapStateToProps)(Profile)