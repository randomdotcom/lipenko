import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, Paper, Avatar } from "@material-ui/core";
import LogOutButton from "./LogOutButton";

function AdminProfile(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.AvatarAndInfo}>
        <div className={classes.AvatarAndEdit}>
          <Paper className={classes.AvatarAndUsername}>
            <p>{props.username}</p>
            <Avatar
              alt="Avatar"
              src="https://www.ercolemoretti.it/WP2016/wp-content/uploads/2016/06/em_avatar_default-user.png"
              className={classes.bigAvatar}
            />
          </Paper>
          <Button
            component={Link}
            to="/profile/edit"
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Редактировать
          </Button>
          <Button
            component={Link}
            to="/admin/customers"
            className={classes.button}
            variant="outlined"
            color="primary"
          >
            СПИСОК КЛИЕНТОВ
          </Button>
        </div>
        <div className={classes.InfoAndLogOutButton}>
          <div className={classes.logOutButton}>
            <LogOutButton handleClick={props.signOut} />
          </div>
          <div className={classes.profileInfo}>
            <Paper className={classes.informationView}>
              <Typography className={classes.informationViewTitle}>
                Основная информация
              </Typography>
              <Typography className={classes.informationTextContainer}>
                <span className={classes.informationTitle}>Тип аккаунта:</span>{" "}
                {props.role}
              </Typography>
              <Typography className={classes.informationTextContainer}>
                <span className={classes.informationTitle}>Эл. почта:</span>{" "}
                {props.email}
              </Typography>
            </Paper>
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
  button: {
    marginTop: 10,
    width: "100%",
    fontWeight: "bold"
  },
  AvatarAndInfo: {
    display: "flex"
  },
  informationView: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 15
  },
  informationTextContainer: {
    marginTop: 5
  },
  informationTitle: {
    backgroundColor: "#ddd",
    padding: 2,
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 3
  },
  informationViewTitle: {
    textTransform: "upperCase",
    fontWeight: "bold",
    fontSize: 16
  }
});

export default withStyles(styles)(AdminProfile);
