import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, Paper, Avatar } from "@material-ui/core";
import { connect } from 'react-redux'
import LogOutButton from './LogOutButton'
import {Link} from 'react-router-dom'

function UserProfile(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.AvatarAndInfo}>
        <div className={classes.AvatarAndEdit}>
          <Paper className={classes.AvatarAndUsername}>
            <p>{props.username}</p>
            <Avatar alt="Avatar" src="https://static.espreso.tv/uploads/article/2596219/images/im578x383-avatar-neytiri-sad.jpg" className={classes.bigAvatar} />
          </Paper>
          <Button component={Link} to="/profile/edit" className={classes.editButton} variant="contained" color="secondary">edit</Button>
          <Button component={Link} to="/profile/bookings" className={classes.editButton} variant="contained" color="primary">my bookings</Button>
        </div>
        <div className={classes.InfoAndLogOutButton}>
          <div className={classes.logOutButton}>
            <LogOutButton />
          </div>
          <div className={classes.profileInfo}>
            <Typography>
              <b>Account type:</b> {props.role}
            </Typography>
            <Typography>
              <b>Email:</b> {props.email}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = theme => ({
  root: {
    marginTop: 20,
    backgroundColor: "whitesmoke",
    boxShadow: "0 1px 7px 1px rgba(0, 0, 0, .25)",
    padding: 25
  },
  bigAvatar: {
    width: 160,
    height: 160
  },
  profileInfo: {
    marginLeft: 20,
  },
  logOutButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  },
  InfoAndLogOutButton: {
    width: '100%'
  },
  AvatarAndUsername: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 15,
    paddingBottom: 15,
    paddingRight: 15,
  },
  AvatarAndEdit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  editButton: {
    marginTop: 10,
    width: '100%',
    fontWeight: 'bold'
  },
  AvatarAndInfo: {
    display: 'flex',
  }
})

const mapStateToProps = state => ({
  role: state.profile.role,
  username: state.profile.data.username,
  email: state.profile.data.email,
});

export default connect(mapStateToProps)(withStyles(styles)(UserProfile))