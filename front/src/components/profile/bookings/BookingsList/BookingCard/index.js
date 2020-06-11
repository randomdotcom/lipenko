import React, { Component } from "react";
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
  DialogActions
} from "@material-ui/core";
import {
  getTranslatedCleaningTypeName,
  minsToHours,
  getTranslatedBookingStatusName
} from "../../../../../services/utils";

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
    this.setState({ reason: event.target.value });
  };

  handleAcceptBook = () => {
    this.props.acceptBook({
      orderId: this.props.booking._id,
      query: this.props.search
    });
  };

  handleCancelBook = () => {
    if (this.props.role === "user") {
      this.props.cancelBook({
        orderId: this.props.booking._id,
        query: this.props.search
      });
    } else if (this.props.role === "executor") {
      this.handleClickOpen();
    }
  };

  handleCancelBookExecutor = () => {
    this.props.cancelBook({
      orderId: this.props.booking._id,
      query: this.props.search,
      reason: this.state.reason
    });
    this.handleClose();
  };

  handleConfirmBook = () => {
    this.props.confirmBook({
      orderId: this.props.booking._id,
      query: this.props.search
    });
  };

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
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота"
    ];
    let days = [];
    booking.cleaningDays.forEach(day => {
      days.push(Days[day]);
    });
    days = days.join(",");

    const RegularityNames = [
      "Один раз",
      "Каждую неделю",
      "Каждые 2 недели",
      "Каждый месяц"
    ];
    const regularity = RegularityNames[booking.regularity];

    const RecurrenceNames = [
      "-",
      "2 недели",
      "месяц",
      "2 месяца",
      "3 месяца",
      "4 месяца",
      "5 месяцев",
      "6 месяцев"
    ];
    const recurrence = RecurrenceNames[booking.recurrence];

    return (
      <div className={classes.listItem}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={getTranslatedCleaningTypeName(booking.type)}
            secondary={
              <>
                <Typography component="div" color="textPrimary">
                  <b>Город:</b> {booking.city}
                </Typography>
                <Typography component="div" color="textPrimary">
                  <b>Адрес:</b> {booking.adress}
                </Typography>
                <Typography component="div" color="textPrimary">
                  <b>Номер телефона:</b> {booking.phoneNumber}
                </Typography>
                {(booking.type === "office") |
                (booking.type === "industrial") ? (
                  <Typography component="div" color="textPrimary">
                    <b>Квадратных метров:</b> {booking.squareMeters}
                  </Typography>
                ) : (
                  <>
                    <Typography component="div" color="textPrimary">
                      <b>Кол-во маленьких комнат:</b> {booking.smallRooms}
                    </Typography>
                    <Typography component="div" color="textPrimary">
                      <b>Кол-во больших комнат:</b> {booking.bigRooms}
                    </Typography>
                    <Typography component="div" color="textPrimary">
                      <b>Кол-во санузлов:</b> {booking.bathRooms}
                    </Typography>
                  </>
                )}
                <Typography component="div" color="textPrimary">
                  <b>Дата начала уборок:</b> {startDateFormat}
                </Typography>
                <Typography component="div" color="textPrimary">
                  <b>Дни уборок:</b> {days}
                </Typography>
                <Typography component="div" color="textPrimary">
                  <b>Дата окончания уборок:</b> {endDateFormat}
                </Typography>
                <Typography component="div" color="textPrimary">
                  <b>Регулярность:</b> {regularity}
                </Typography>
                <Typography component="div" color="textPrimary">
                  <b>Длительность:</b> {recurrence}
                </Typography>
                {this.props.role !== "executor" && (
                  <Typography component="div" color="textPrimary">
                    <b>Название организации:</b> {booking.companyName}
                  </Typography>
                )}
                <Typography component="div" color="textPrimary">
                  <b>Цена за уборку:</b> {booking.price}р
                </Typography>
                <Typography component="div" color="textPrimary">
                  <b>Время:</b> {minsToHours(booking.time)}
                </Typography>
                <Typography component="div" color="textPrimary">
                  <b>Статус:</b>{" "}
                  {getTranslatedBookingStatusName(booking.status)}
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
                    Принять
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
                    Заказ выполнен
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
                    Отменить
                  </Button>
                ) : null}
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Отмена заказа
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      value={this.state.reason}
                      onChange={this.handleChangeReason}
                      label="Причина"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose}>Назад</Button>
                    <Button
                      onClick={this.handleCancelBookExecutor}
                      variant="outlined"
                      color="secondary"
                    >
                      Подтвердить отмену
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

export default withStyles(styles)(BookingCard);
