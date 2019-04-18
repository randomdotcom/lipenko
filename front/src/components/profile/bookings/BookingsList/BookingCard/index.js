import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";
import {
  acceptBook,
  cancelBook,
  confirmBook
} from "../../../../../actions/auth.actions";

class BookingCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      reason: ""
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeReason = event => {
    this.setState({ reason: event.target.value })
  }

  handleAcceptBook = () => {
    this.props.acceptBook({
      orderId: this.props.booking._id,
      query: this.props.search
    });
  }

  handleCancelBook = () => {
    if (this.props.role === "user") {
      this.props.cancelBook({
        orderId: this.props.booking._id,
        query: this.props.search
      });
    } else if (this.props.role === "executor") {
      this.handleClickOpen();
    }
  }

  handleCancelBookExecutor = () => {
    this.props.cancelBook({
      orderId: this.props.booking._id,
      query: this.props.search,
      reason: this.state.reason
    });
    this.handleClose();
  }

  handleConfirmBook = () => {
    this.props.confirmBook({
      orderId: this.props.booking._id,
      query: this.props.search
    });
  }

  render() {
    const { classes, booking } = this.props;
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    const startDateFormat =
      startDate.getDate() +
      "." +
      startDate.getMonth() +
      "." +
      startDate.getFullYear();
    const endDateFormat =
      endDate.getDate() +
      "." +
      endDate.getMonth() +
      "." +
      endDate.getFullYear();

    const Days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let days = [];
    booking.cleaningDays.forEach(day => {
      days.push(Days[day]);
    });
    days = days.join(",");

    const RegularityNames = [
      "Ones",
      "Every week",
      "Every 2 week",
      "Every month"
    ];
    const regularity = RegularityNames[booking.regularity];

    const RecurrenceNames = [
      "None",
      "For 2 weeks",
      "For month",
      "For 2 months",
      "For 3 months",
      "For 4 months",
      "For 5 months",
      "For 6 months"
    ];
    const recurrence = RecurrenceNames[booking.recurrence];

    return (
      <div className={classes.listItem}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={booking.type}
            secondary={
              <>
                <Typography component="span" color="textPrimary">
                  <b>City:</b> {booking.city}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Adress:</b> {booking.adress}
                </Typography>
                {(booking.type === "office") |
                (booking.type === "industrial") ? (
                  <Typography component="span" color="textPrimary">
                    <b>Square meters:</b> {booking.squareMeters}
                  </Typography>
                ) : (
                  <>
                    <Typography component="span" color="textPrimary">
                      <b>Small rooms count:</b> {booking.smallRooms}
                    </Typography>
                    <Typography component="span" color="textPrimary">
                      <b>Big rooms count:</b> {booking.bigRooms}
                    </Typography>
                    <Typography component="span" color="textPrimary">
                      <b>Bath rooms count:</b> {booking.bathRooms}
                    </Typography>
                  </>
                )}
                <Typography component="span" color="textPrimary">
                  <b>Start date:</b> {startDateFormat}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Cleaning days:</b> {days}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>End date:</b> {endDateFormat}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Regularity:</b> {regularity}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Recurrence:</b> {recurrence}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Company name:</b> {booking.companyName}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Price:</b> {booking.price}rub
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Time:</b> {booking.time}min
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Status:</b> {booking.status}
                </Typography>
                {(this.props.role === "executor") &
                (booking.status === "new") ? (
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleAcceptBook}
                  >
                    Accept
                  </Button>
                ) : null}
                {(this.props.role === "user") &
                (booking.status === "accepted") &
                (new Date(booking.endDate) < new Date()) ? (
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={this.handleConfirmBook}
                  >
                    Confirm
                  </Button>
                ) : null}
                {booking.status === "new" ? (
                  <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                    onClick={this.handleCancelBook}
                  >
                    Cancel
                  </Button>
                ) : null}
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
                      onClick={this.handleCancelBookExecutor}
                      variant="outlined"
                      color="secondary"
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            }
          />
        </ListItem>
      </div>
    );
  }
}

const styles = theme => ({
  listItem: {
    borderBottom: "2px solid rgba(245,0,87,0.2)",
    borderRadius: "2%"
  },
  AvatarAndSummary: {
    display: "flex"
  },
  logo: {
    width: 125,
    height: 125,
    boxShadow: theme.shadows[2]
  },
  button: {
    margin: theme.spacing.unit
  }
});

const mapStateToProps = state => ({
  role: state.profile.role,
  search: state.router.location.search
});

export default connect(
  mapStateToProps,
  { acceptBook, cancelBook, confirmBook }
)(withStyles(styles)(BookingCard));
