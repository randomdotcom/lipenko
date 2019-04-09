import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import {connect } from 'react-redux'
import LogOutButton from './LogOutButton'

function UserProfile(props) {
  const {classes} = props;
  return (
      <div className={classes.root}>
        <Typography>
          <b>Account type:</b> {props.role}
        </Typography>
        <Typography>
          <b>Username:</b> {props.username}
        </Typography>
        <Typography>
          <b>Adress:</b> {props.adress}
        </Typography>
        <Typography>
          <b>Phone number:</b> {props.phoneNumber}
        </Typography>
        <Typography>
          <b>Email:</b> {props.email}
        </Typography>
        <LogOutButton/>
      </div>
  );
}

const styles = theme => ({
  root: {
    marginTop: 20,
    backgroundColor: "whitesmoke",
    boxShadow: "0 1px 7px 1px rgba(0, 0, 0, .25)",
    padding: 25
  }
})

const mapStateToProps = state => ({
  role: state.profile.role,
  username: state.profile.data.username,
  adress: state.profile.data.adress,
  email: state.profile.data.email,
  phoneNumber: state.profile.data.phofileNumber
});

export default connect(mapStateToProps)(withStyles(styles)(UserProfile))