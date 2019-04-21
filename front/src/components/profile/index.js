import React from "react";
import UserProfile from "../../containers/profile/UserProfileContainer";
import ExecutorProfile from "../../containers/profile/ExecutorProfileContainer";
import AdminProfile from "../../containers/profile/AdminProfileContainer";

export default function Profile(props) {
  if (props.role === "user") {
    return <UserProfile />;
  } else if (props.role === "executor") {
    return <ExecutorProfile />;
  } else if (props.role === "admin") {
    return <AdminProfile />;
  }
}
