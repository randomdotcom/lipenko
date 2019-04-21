import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, Paper, Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import LogOutButton from "./LogOutButton";
import { Link } from "react-router-dom";

function UserProfile(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.AvatarAndInfo}>
        <div className={classes.AvatarAndEdit}>
          <Paper className={classes.AvatarAndUsername}>
            <p>{props.username}</p>
            <Avatar
              alt="Avatar"
              src="https://static.espreso.tv/uploads/article/2596219/images/im578x383-avatar-neytiri-sad.jpg"
              className={classes.bigAvatar}
            />
          </Paper>
          <Button
            component={Link}
            to="/profile/edit"
            className={classes.editButton}
            variant="contained"
            color="secondary"
          >
            edit
          </Button>
          <Button
            component={Link}
            to="/profile/bookings"
            className={classes.editButton}
            variant="contained"
            color="primary"
          >
            my bookings
          </Button>
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
            <Typography>
              <b>Phone number:</b> {props.phoneNumber}
            </Typography>
            <Typography>
              <b>City:</b> {props.city}
            </Typography>
            <Typography>
              <b>Company name:</b> {props.companyName}
            </Typography>
            <Typography>
              <b>Description:</b> {props.description}
            </Typography>
            <Typography>
              <b>TypesOfCleaning</b>
            </Typography>
            <Typography>
              <b>Standart small room:</b> {props.standartSmallRoom}
            </Typography>
            <Typography>
              <b>Standart big room:</b> {props.standartBigRoom}
            </Typography>
            <Typography>
              <b>Standart bathroom:</b> {props.standartBathRoom}
            </Typography>
            <Typography>
              <b>General small room:</b> {props.generalSmallRoom}
            </Typography>
            <Typography>
              <b>General big room:</b> {props.generalBigRoom}
            </Typography>
            <Typography>
              <b>General bathroom:</b> {props.generalBathRoom}
            </Typography>
            <Typography>
              <b>After repair small room:</b> {props.afterRepairSmallRoom}
            </Typography>
            <Typography>
              <b>After repair big room:</b> {props.afterRepairBigRoom}
            </Typography>
            <Typography>
              <b>After repair bathroom:</b> {props.afterRepairBathRoom}
            </Typography>
            <Typography>
              <b>Carpet small:</b> {props.smallCarpet}
            </Typography>
            <Typography>
              <b>Carpet big:</b> {props.bigCarpet}
            </Typography>
            <Typography>
              <b>Office:</b> {props.office}
            </Typography>
            <Typography>
              <b>Furniture:</b> {props.furniture}
            </Typography>
            <Typography>
              <b>Industrial:</b> {props.industrial}
            </Typography>
            <Typography>
              <b>Pool:</b> {props.pool}
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
    padding: 25,
    display: "flex",
    flexDirection: "column"
  },
  bigAvatar: {
    width: 160,
    height: 160
  },
  profileInfo: {
    marginLeft: 20
  },
  logOutButton: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%"
  },
  InfoAndLogOutButton: {
    width: "100%"
  },
  AvatarAndUsername: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 15,
    paddingBottom: 15,
    paddingRight: 15
  },
  AvatarAndEdit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  editButton: {
    marginTop: 10,
    width: "100%",
    fontWeight: "bold"
  },
  AvatarAndInfo: {
    display: "flex"
  }
});

const mapStateToProps = state => ({
  role: state.profile.role,
  username: state.profile.data.username,
  city: state.profile.data.city,
  email: state.profile.data.email,
  phoneNumber: state.profile.data.phoneNumber,
  companyName: state.profile.data.companyName,
  description: state.profile.data.description,
  standartSmallRoom:
    state.profile.data.typesOfCleaning.standart.standartSmallRoom,
  standartBigRoom: state.profile.data.typesOfCleaning.standart.standartBigRoom,
  standartBathRoom:
    state.profile.data.typesOfCleaning.standart.standartBathRoom,
  generalBigRoom: state.profile.data.typesOfCleaning.general.generalBigRoom,
  generalSmallRoom: state.profile.data.typesOfCleaning.general.generalSmallRoom,
  generalBathRoom: state.profile.data.typesOfCleaning.general.generalBathRoom,
  afterRepairBigRoom:
    state.profile.data.typesOfCleaning.afterRepair.afterRepairBigRoom,
  afterRepairSmallRoom:
    state.profile.data.typesOfCleaning.afterRepair.afterRepairSmallRoom,
  afterRepairBathRoom:
    state.profile.data.typesOfCleaning.afterRepair.afterRepairBathRoom,
  bigCarpet: state.profile.data.typesOfCleaning.carpet.bigCarpet,
  smallCarpet: state.profile.data.typesOfCleaning.carpet.smallCarpet,
  office: state.profile.data.typesOfCleaning.office,
  industrial: state.profile.data.typesOfCleaning.industrial,
  furniture: state.profile.data.typesOfCleaning.furniture,
  pool: state.profile.data.typesOfCleaning.pool
});

export default connect(mapStateToProps)(withStyles(styles)(UserProfile));
