import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Paper,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@material-ui/core";
import Reviews from "../../containers/companyPage/Reviews";

class CompanyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openBlock: false,
      openReview: false,
      reason: "",
      rating: 0,
      comment: ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.loadCompany(id);
  }

  handleClickOpenBlockDialog = () => {
    this.setState({ openBlock: true });
  };

  handleClickOpenReviewDialog = () => {
    this.setState({ openReview: true });
  };

  handleCloseBlockDialog = () => {
    this.setState({ openBlock: false });
  };

  handleCloseReviewDialog = () => {
    this.setState({ openReview: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleReviewCompany = () => {
    this.props.reviewCompany({
      rating: this.state.rating,
      comment: this.state.comment,
      companyId: this.props.company._id
    });
    this.handleCloseReviewDialog();
  };

  handleBlockCompany = () => {
    this.props.blockCompany({
      companyId: this.props.company._id,
      reason: this.state.reason
    });
    this.handleCloseBlockDialog();
  };

  handleUnblockCompany = () => {
    this.props.unblockCompany({
      companyId: this.props.company._id
    });
  };

  handleClickOrder = () => {
    const { _id, workingDays, typesOfCleaning, city } = this.props.company;
    this.props.chooseCompany(_id, workingDays, typesOfCleaning, city);
  };

  render() {
    const { classes, company, toc } = this.props;
    console.log(company);
    if (company.companyName) {
      return (
        <div className={classes.root}>
          <div>
            <div className={classes.AvatarAndInfo}>
              <div className={classes.AvatarAndEdit}>
                <Paper className={classes.AvatarAndUsername}>
                  <p>{company.companyName}</p>
                  <Avatar
                    alt="Avatar"
                    src={
                      company.logoUrl
                        ? company.logoUrl
                        : process.env.REACT_APP_API_URL + "public/company.jpg"
                    }
                    className={classes.bigAvatar}
                  />
                </Paper>
                {this.props.role !== "executor" && !company.isBlocked ? (
                  <Button
                    onClick={this.handleClickOrder}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    <b>заказать уборку</b>
                  </Button>
                ) : null}
                {this.props.role === "user" && !company.isBlocked ? (
                  <Button
                    onClick={this.handleClickOpenReviewDialog}
                    name="openReview"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    <b>ОСТАВИТЬ ОТЗЫВ</b>
                  </Button>
                ) : null}
                {this.props.role === "admin" && !company.isBlocked ? (
                  <Button
                    onClick={this.handleClickOpenBlockDialog}
                    name="openBlock"
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                  >
                    <b>ЗАБЛОКИРОВАТЬ</b>
                  </Button>
                ) : null}
                {this.props.role === "admin" && company.isBlocked === true ? (
                  <>
                    <span>Заблокирована, причина: {company.blockReason}</span>
                    <Button
                      onClick={this.handleUnblockCompany}
                      variant="outlined"
                      color="secondary"
                      className={classes.button}
                    >
                      <b>РАЗБЛОКИРОВАТЬ</b>
                    </Button>
                  </>
                ) : null}
              </div>
              <div className={classes.InfoAndLogOutButton}>
                <div className={classes.profileInfo}>
                  {company.isBlocked && this.props.role !== "admin" ? (
                    <span>
                      Компания заблокирована, причина: {company.blockReason}
                    </span>
                  ) : (
                    <>
                      <Paper className={classes.informationView}>
                        <Typography className={classes.informationViewTitle}>
                          Основная информация
                        </Typography>
                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Рейтинг:
                          </span>{" "}
                          {company.rating}
                        </Typography>
                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Город:
                          </span>{" "}
                          {company.city}
                        </Typography>
                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Информация:
                          </span>{" "}
                          {company.description}
                        </Typography>
                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Номер телефона:
                          </span>{" "}
                          {company.phoneNumber}
                        </Typography>
                      </Paper>

                      <Paper className={classes.informationView}>
                        <Typography className={classes.informationViewTitle}>
                          Прайс лист
                        </Typography>

                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Обычная - мал. комната:
                          </span>{" "}
                          {toc.standart.standartSmallRoom}р
                        </Typography>

                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Обычная - бол. комната:
                          </span>{" "}
                          {toc.standart.standartBigRoom}р
                        </Typography>

                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Обычная - санузел:
                          </span>{" "}
                          {toc.standart.standartBathRoom}р
                        </Typography>

                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Генеральная - мал. комната:
                          </span>{" "}
                          {toc.general.generalSmallRoom}р
                        </Typography>

                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Генеральная - бол. комната:
                          </span>{" "}
                          {toc.general.generalBigRoom}р
                        </Typography>

                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Генеральная - санузел:
                          </span>{" "}
                          {toc.general.generalBathRoom}р
                        </Typography>

                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            После ремонта - мал. комната:
                          </span>{" "}
                          {toc.afterRepair.afterRepairSmallRoom}р
                        </Typography>

                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            После ремонта - бол. комната:
                          </span>{" "}
                          {toc.afterRepair.afterRepairBigRoom}р
                        </Typography>

                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            После ремонта - санузел:
                          </span>{" "}
                          {toc.afterRepair.afterRepairBathRoom}р
                        </Typography>

                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Офисная, за кв. м.:
                          </span>{" "}
                          {toc.office}р
                        </Typography>

                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Промышленная, за кв.м.:
                          </span>{" "}
                          {toc.industrial}р
                        </Typography>

                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Мал. ковер:
                          </span>{" "}
                          {toc.carpet.smallCarpet}р
                        </Typography>

                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Бол. ковер:
                          </span>{" "}
                          {toc.carpet.bigCarpet}р
                        </Typography>

                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Чистка мебели:
                          </span>{" "}
                          {toc.furniture}р
                        </Typography>

                        <Typography
                          className={classes.informationTextContainer}
                        >
                          <span className={classes.informationTitle}>
                            Чистка бассейна:
                          </span>{" "}
                          {toc.pool}р
                        </Typography>
                      </Paper>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div>
              <Reviews id={this.props.match.params.id} />
            </div>
          </div>
          <Dialog
            open={this.state.openBlock}
            onClose={this.handleCloseBlockDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Блокировка компании
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="reason"
                value={this.state.reason}
                onChange={this.handleChange}
                label="Причина"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseBlockDialog}>Назад</Button>
              <Button
                onClick={this.handleBlockCompany}
                variant="outlined"
                color="secondary"
              >
                ЗАБЛОКИРОВАТЬ
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.openReview}
            onClose={this.handleCloseReviewDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">ОЦЕНИТЬ КОМПАНИЮ</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                name="rating"
                value={this.state.rating}
                onChange={this.handleChange}
                label="Оценка(0-5)"
                fullWidth
              />
              <TextField
                autoFocus
                name="comment"
                value={this.state.comment}
                onChange={this.handleChange}
                label="Комментарий"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseReviewDialog}>Назад</Button>
              <Button
                onClick={this.handleReviewCompany}
                variant="outlined"
                color="secondary"
              >
                Отправить
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    } else {
      return <p>Company not found</p>;
    }
  }
}

const styles = theme => ({
  root: {
    marginTop: 20,
    backgroundColor: "whitesmoke",
    boxShadow: "0 1px 7px 1px rgba(0, 0, 0, .25)",
    padding: 25
  },
  button: {
    marginTop: 8
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

export default withStyles(styles)(CompanyPage);
