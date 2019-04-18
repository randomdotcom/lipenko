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
import { connect } from "react-redux";
import { loadCompany } from "../../actions/companies.actions";
import { chooseCompany } from "../../actions/order.actions";
import { blockCompany, unblockCompany } from "../../actions/admin.actions";

class CompanyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      reason: ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.loadCompany(id);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeReason = event => {
    this.setState({ reason: event.target.value });
  };

  handleBlockCompany = () => {
    this.props.blockCompany({
      companyId: this.props.company._id,
      reason: this.state.reason
    });
    this.handleClose();
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
    if (company.companyName) {
      return (
        <div className={classes.root}>
          <div className={classes.AvatarAndInfo}>
            <div className={classes.AvatarAndEdit}>
              <Paper className={classes.AvatarAndUsername}>
                <p>{company.companyName}</p>
                <Avatar
                  alt="Avatar"
                  src="https://static.espreso.tv/uploads/article/2596219/images/im578x383-avatar-neytiri-sad.jpg"
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
              {this.props.role === "admin" && !company.isBlocked ? (
                <Button
                  onClick={this.handleClickOpen}
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
                  <span>Company is blocked, reason: {company.blockReason}</span>
                ) : (
                  <>
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
                      <b>Standart bathroom:</b> {toc.standart.standartBathRoom}
                    </Typography>
                    <Typography>
                      <b>General small room:</b> {toc.general.generalSmallRoom}
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
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Cancel book</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={this.state.reason}
                onChange={this.handleChangeReason}
                label="Reason"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Back</Button>
              <Button
                onClick={this.handleBlockCompany}
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

const mapStateToProps = state => ({
  role: state.profile.role,
  company: state.company,
  toc: state.company.typesOfCleaning
});

export default connect(
  mapStateToProps,
  { loadCompany, chooseCompany, blockCompany, unblockCompany }
)(withStyles(styles)(CompanyPage));
