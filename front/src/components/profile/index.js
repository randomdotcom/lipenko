import React from "react";
import { connect } from "react-redux";
import UserProfile from "./UserProfile";
import ExecutorProfile from "./ExecutorProfile";
import AdminProfile from "./AdminProfile";

function Profile(props) {
  if (props.role === "user") {
    return <UserProfile />;
  } else if (props.role === "executor") {
    return <ExecutorProfile />;
  } else if (props.role === "admin") {
    return <AdminProfile />;
  }
}

const mapStateToProps = state => ({
  role: state.profile.role
});

export default connect(mapStateToProps)(Profile);
