import React from "react";
import { Button } from "@material-ui/core";

export default function LogOutButton(props) {
  return (
    <Button variant="contained" onClick={props.handleClick}>
      Log Out
    </Button>
  );
}
