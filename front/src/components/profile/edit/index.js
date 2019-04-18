import React from "react";
import { connect } from 'react-redux'
import UserProfileEdit from './UserProfileEdit'
import ExecutorProfileEdit from './ExecutorProfileEdit'
import AdminProfileEdit from './AdminProfileEdit'

function ProfileEdit(props) {
  if (props.role === 'user') {
    return <UserProfileEdit />
  } else if (props.role === 'executor') {
    return <ExecutorProfileEdit />
  } else if (props.role === 'admin') {
    return <AdminProfileEdit />
  }
}

const mapStateToProps = state => ({
  role: state.profile.role
});

export default connect(mapStateToProps)(ProfileEdit)