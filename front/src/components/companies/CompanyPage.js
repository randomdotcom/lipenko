import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, Paper, Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { loadCompany } from "../../actions/companies.actions";

class CompanyPage extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.loadCompany(id);
  }

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
              <Button>Заказать уборку</Button>
            </div>
            <div className={classes.InfoAndLogOutButton}>
              <div className={classes.profileInfo}>
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
                  <b>Standart small room:</b> {toc.standart.standartSmallRoom}
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
              </div>
            </div>
          </div>
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
  company: state.company,
  toc: state.company.typesOfCleaning
});

export default connect(
  mapStateToProps,
  { loadCompany }
)(withStyles(styles)(CompanyPage));
