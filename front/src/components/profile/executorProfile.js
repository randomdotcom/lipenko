import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { connect } from 'react-redux'
import LogOutButton from './LogOutButton'

function UserProfile(props) {
  const {classes} = props;
  return (
      <div className={classes.root}>
        <div>
        <Typography>
          <b>Account type:</b> {props.role}
        </Typography>
        <Typography>
          <b>Username:</b> {props.username}
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
          <b>After repair small room:</b> {props.afterRepairmallRoom}
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
  city: state.profile.data.city,
  email: state.profile.data.email,
  phoneNumber: state.profile.data.phoneNumber,
  companyName: state.profile.data.companyName,
  description: state.profile.data.description,
  standartSmallRoom: state.profile.data.typesOfCleaning.standart.standartSmallRoom,
  standartBigRoom: state.profile.data.typesOfCleaning.standart.standartBigRoom,
  standartBathRoom: state.profile.data.typesOfCleaning.standart.standartBathRoom,
  generalBigRoom: state.profile.data.typesOfCleaning.general.generalBigRoom,
  generalSmallRoom: state.profile.data.typesOfCleaning.general.generalSmallRoom,
  generalBathRoom: state.profile.data.typesOfCleaning.general.generalBathRoom,
  afterRepairBigRoom: state.profile.data.typesOfCleaning.afterRepair.afterRepairBigRoom,
  afterRepairSmallRoom: state.profile.data.typesOfCleaning.afterRepair.afterRepairSmallRoom,
  afterRepairBathRoom: state.profile.data.typesOfCleaning.afterRepair.afterRepairBathRoom,
  bigCarpet: state.profile.data.typesOfCleaning.carpet.bigCarpet,
  smallCarpet: state.profile.data.typesOfCleaning.carpet.smallCarpet,
  office: state.profile.data.typesOfCleaning.office,
  industrial: state.profile.data.typesOfCleaning.industrial,
  furniture: state.profile.data.typesOfCleaning.furniture,
  pool: state.profile.data.typesOfCleaning.pool,
});

export default connect(mapStateToProps)(withStyles(styles)(UserProfile))