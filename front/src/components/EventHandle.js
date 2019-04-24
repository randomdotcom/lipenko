import React from "react";
import { Snackbar, withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";

function EventHandle(props) {
  const { classes } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={Boolean(props.event)}
      autoHideDuration={4000}
      onClose={props.clearEvent}
      message={<span>{props.event}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          className={classes.close}
          onClick={props.clearEvent}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
}

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
    color: green[500]
  }
});

export default withStyles(styles)(EventHandle);
