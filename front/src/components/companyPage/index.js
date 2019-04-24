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
    console.log(company)
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
                    src={company.logoUrl ? company.logoUrl : process.env.REACT_APP_API_URL+'public/company.jpg'}
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
                    <b>Book cleaning</b>
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
                    <b>Review company</b>
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
                    <b>block company</b>
                  </Button>
                ) : null}
                {this.props.role === "admin" && company.isBlocked === true ? (
                  <>
                    <span>Blocked, reason: {company.blockReason}</span>
                    <Button
                      onClick={this.handleUnblockCompany}
                      variant="outlined"
                      color="secondary"
                      className={classes.button}
                    >
                      <b>unblock company</b>
                    </Button>
                  </>
                ) : null}
              </div>
              <div className={classes.InfoAndLogOutButton}>
                <div className={classes.profileInfo}>
                  {company.isBlocked && this.props.role !== "admin" ? (
                    <span>
                      Company is blocked, reason: {company.blockReason}
                    </span>
                  ) : (
                    <>
                      <Typography>
                        <b>Rating:</b> {company.rating}
                      </Typography>
                      <Typography>
                        <b>City:</b> {company.city}
                      </Typography>
                      <Typography>
                        <b>Description:</b> {company.description}
                      </Typography>
                      <Typography>
                        <b>Phone number:</b> {company.phoneNumber}
                      </Typography>
                      <Typography>
                        <b>TypesOfCleaning</b>
                      </Typography>
                      <Typography>
                        <b>Standart small room:</b>{" "}
                        {toc.standart.standartSmallRoom}
                      </Typography>
                      <Typography>
                        <b>Standart big room:</b> {toc.standart.standartBigRoom}
                      </Typography>
                      <Typography>
                        <b>Standart bathroom:</b>{" "}
                        {toc.standart.standartBathRoom}
                      </Typography>
                      <Typography>
                        <b>General small room:</b>{" "}
                        {toc.general.generalSmallRoom}
                      </Typography>
                      <Typography>
                        <b>General big room:</b> {toc.general.generalBigRoom}
                      </Typography>
                      <Typography>
                        <b>General bathroom:</b> {toc.general.generalBathRoom}
                      </Typography>
                      <Typography>
                        <b>After repair small room:</b>{" "}
                        {toc.afterRepair.afterRepairSmallRoom}
                      </Typography>
                      <Typography>
                        <b>After repair big room:</b>{" "}
                        {toc.afterRepair.afterRepairBigRoom}
                      </Typography>
                      <Typography>
                        <b>After repair bathroom:</b>{" "}
                        {toc.afterRepair.afterRepairBathRoom}
                      </Typography>
                      <Typography>
                        <b>Carpet small:</b> {toc.carpet.smallCarpet}
                      </Typography>
                      <Typography>
                        <b>Carpet big:</b> {toc.carpet.bigCarpet}
                      </Typography>
                      <Typography>
                        <b>Office:</b> {toc.office}
                      </Typography>
                      <Typography>
                        <b>Furniture:</b> {toc.furniture}
                      </Typography>
                      <Typography>
                        <b>Industrial:</b> {toc.industrial}
                      </Typography>
                      <Typography>
                        <b>Pool:</b> {toc.pool}
                      </Typography>
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
            <DialogTitle id="form-dialog-title">Block company</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="reason"
                value={this.state.reason}
                onChange={this.handleChange}
                label="Reason"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseBlockDialog}>Back</Button>
              <Button
                onClick={this.handleBlockCompany}
                variant="outlined"
                color="secondary"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.openReview}
            onClose={this.handleCloseReviewDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Review company</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                name="rating"
                value={this.state.rating}
                onChange={this.handleChange}
                label="Rating(between 0 and 5)"
                fullWidth
              />
              <TextField
                autoFocus
                name="comment"
                value={this.state.comment}
                onChange={this.handleChange}
                label="Comment"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseReviewDialog}>Back</Button>
              <Button
                onClick={this.handleReviewCompany}
                variant="outlined"
                color="secondary"
              >
                Confirm
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
  }
});

export default withStyles(styles)(CompanyPage);
