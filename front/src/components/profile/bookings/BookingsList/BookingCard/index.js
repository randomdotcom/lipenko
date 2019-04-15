import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

function BookingCard(props) {
  const { classes, booking } = props;
  const startDate = new Date(booking.startDate);
  const endDate = new Date(booking.endDate);
  const startDateFormat =
    startDate.getDate() +
    "." +
    startDate.getMonth() +
    "." +
    startDate.getFullYear();
  const endDateFormat =
    endDate.getDate() + "." + endDate.getMonth() + "." + endDate.getFullYear();

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

  const RegularityNames = ["Ones", "Every week", "Every 2 week", "Every month"];
  const regularity = RegularityNames[booking.regularity];

  const RecurrenceNames = [
    "None",
    "Every 2 week",
    "Every month",
    "Every 2 month",
    "Every 3 month",
    "Every 4 month",
    "Every 5 month",
    "Every 6 month"
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
              {(booking.type === "office") | (booking.type === "industrial") ? (
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
            </>
          }
        />
      </ListItem>
    </div>
  );
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

export default withStyles(styles)(BookingCard);
