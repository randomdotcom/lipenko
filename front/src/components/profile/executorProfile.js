import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, Paper, Avatar } from "@material-ui/core";
import LogOutButton from "./LogOutButton";

function ExecutorProfile(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.AvatarAndInfo}>
        <div className={classes.AvatarAndEdit}>
          <Paper className={classes.AvatarAndUsername}>
            <p>{props.username}</p>
            <Avatar
              alt="Avatar"
              src={
                props.logoUrl
                  ? props.logoUrl
                  : process.env.REACT_APP_API_URL + "public/company.jpg"
              }
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
            Редактировать
          </Button>
          <Button
            component={Link}
            to="/profile/bookings"
            className={classes.editButton}
            variant="contained"
            color="primary"
          >
            Мои заказы
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
              <Typography className={classes.informationTextContainer}>
                <span className={classes.informationTitle}>
                  Номер телефона:
                </span>{" "}
                {props.phoneNumber}
              </Typography>
              <Typography className={classes.informationTextContainer}>
                <span className={classes.informationTitle}>Город:</span>{" "}
                {props.city}
              </Typography>
              <Typography className={classes.informationTextContainer}>
                <span className={classes.informationTitle}>
                  Название организации:
                </span>{" "}
                {props.companyName}
              </Typography>
              <Typography className={classes.informationTextContainer}>
                <span className={classes.informationTitle}>Инфорамция:</span>{" "}
                {props.description}
              </Typography>
            </Paper>
            <Paper className={classes.informationView}>
              <Typography className={classes.informationViewTitle}>
                Прайс лист
              </Typography>
              {props.standartSmallRoom ? (
                <Typography className={classes.informationTextContainer}>
                  <span className={classes.informationTitle}>
                    Обычная - мал. комната:
                  </span>{" "}
                  {props.standartSmallRoom}р
                </Typography>
              ) : null}

              {props.standartBigRoom ? (
                <Typography className={classes.informationTextContainer}>
                  <span className={classes.informationTitle}>
                    Обычная - бол. комната:
                  </span>{" "}
                  {props.standartBigRoom}р
                </Typography>
              ) : null}

              {props.standartBathRoom ? (
                <Typography className={classes.informationTextContainer}>
                  <span className={classes.informationTitle}>
                    Обычная - санузел:
                  </span>{" "}
                  {props.standartBathRoom}р
                </Typography>
              ) : null}

              {props.generalSmallRoom ? (
                <Typography className={classes.informationTextContainer}>
                  <span className={classes.informationTitle}>
                    Генеральная - мал. комната:
                  </span>{" "}
                  {props.generalSmallRoom}р
                </Typography>
              ) : null}

              {props.generalBigRoom ? (
                <Typography className={classes.informationTextContainer}>
                  <span className={classes.informationTitle}>
                    Генеральная - бол. комната:
                  </span>{" "}
                  {props.generalBigRoom}р
                </Typography>
              ) : null}

              {props.generalBathRoom ? (
                <Typography className={classes.informationTextContainer}>
                  <span className={classes.informationTitle}>
                    Генеральная - санузел:
                  </span>{" "}
                  {props.generalBathRoom}р
                </Typography>
              ) : null}

              {props.afterRepairSmallRoom ? (
                <Typography className={classes.informationTextContainer}>
                  <span className={classes.informationTitle}>
                    После ремонта - мал. комната:
                  </span>{" "}
                  {props.afterRepairSmallRoom}р
                </Typography>
              ) : null}

              {props.afterRepairBigRoom ? (
                <Typography className={classes.informationTextContainer}>
                  <span className={classes.informationTitle}>
                    После ремонта - бол. комната:
                  </span>{" "}
                  {props.afterRepairBigRoom}р
                </Typography>
              ) : null}

              {props.afterRepairBathRoom ? (
                <Typography className={classes.informationTextContainer}>
                  <span className={classes.informationTitle}>
                    После ремонта - санузел:
                  </span>{" "}
                  {props.afterRepairBathRoom}р
                </Typography>
              ) : null}

              {props.office ? (
                <Typography className={classes.informationTextContainer}>
                  <span className={classes.informationTitle}>
                    Офисная, за кв. м.:
                  </span>{" "}
                  {props.office}р
                </Typography>
              ) : null}

              {props.industrial ? (
                <Typography className={classes.informationTextContainer}>
                  <span className={classes.informationTitle}>
                    Промышленная, за кв.м.:
                  </span>{" "}
                  {props.industrial}р
                </Typography>
              ) : null}

              {props.smallCarpet ? (
                <Typography className={classes.informationTextContainer}>
                  <span className={classes.informationTitle}>Мал. ковер:</span>{" "}
                  {props.smallCarpet}р
                </Typography>
              ) : null}

              {props.bigCarpet ? (
                <Typography className={classes.informationTextContainer}>
                  <span className={classes.informationTitle}>Бол. ковер:</span>{" "}
                  {props.bigCarpet}р
                </Typography>
              ) : null}

              {props.furniture ? (
                <Typography className={classes.informationTextContainer}>
                  <span className={classes.informationTitle}>
                    Чистка мебели:
                  </span>{" "}
                  {props.furniture}р
                </Typography>
              ) : null}

              {props.pool ? (
                <Typography className={classes.informationTextContainer}>
                  <span className={classes.informationTitle}>
                    Чистка бассейна:
                  </span>{" "}
                  {props.pool}р
                </Typography>
              ) : null}
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

export default withStyles(styles)(ExecutorProfile);
