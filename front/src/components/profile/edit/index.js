import React from "react";
import UserProfileEdit from "../../../containers/profile/edit/UserProfileEditContainer";
import ExecutorProfileEdit from "../../../containers/profile/edit/ExecutorProfileEditContainer";
import AdminProfileEdit from "../../../containers/profile/edit/AdminProfileEditContainer";

export default function ProfileEdit(props) {
  if (props.role === "user") {
    return <UserProfileEdit />;
  } else if (props.role === "executor") {
    return <ExecutorProfileEdit />;
  } else if (props.role === "admin") {
    return <AdminProfileEdit />;
  }
}
