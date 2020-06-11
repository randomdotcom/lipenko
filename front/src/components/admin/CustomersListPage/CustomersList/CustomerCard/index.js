import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@material-ui/core";

class CustomerCard extends Component {
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

  handleBlockCustomer = () => {
    const query = this.props.search;

    this.props.blockCustomer({
      customerId: this.props.customer._id,
      reason: this.state.reason,
      query
    });
    this.handleClose();
  };

  handleUnblockCustomer = () => {
    const query = this.props.search;

    this.props.unblockCustomer({
      customerId: this.props.customer._id,
      query
    });
  };

  render() {
    const { classes, customer } = this.props;
    return (
      <div className={classes.listItem}>
        <ListItem alignItems="flex-start">
          <Avatar
            alt="Avatar"
            src="https://static.espreso.tv/uploads/article/2596219/images/im578x383-avatar-neytiri-sad.jpg"
            className={classes.logo}
          />
          <ListItemText
            primary={customer.username}
            secondary={
              <>
                <Typography component="span" color="textPrimary">
                  <b>Адрес:</b> {customer.adress}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Эл. почта:</b> {customer.email}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Номер телефона:</b> {customer.phoneNumber}
                </Typography>
                {customer.isBlocked ? (
                  <>
                    <div>Заблокирован, причина: {customer.blockReason}</div>
                    <Button
                      onClick={this.handleUnblockCustomer}
                      variant="outlined"
                      color="secondary"
                      className={classes.button}
                    >
                      <b>РАЗБЛОКИРОВАТЬ</b>
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={this.handleClickOpen}
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                  >
                    <b>ЗАБЛОКИРОВАТЬ</b>
                  </Button>
                )}
              </>
            }
          />
        </ListItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Блокировка пользователя
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
              onClick={this.handleBlockCustomer}
              variant="outlined"
              color="secondary"
            >
              Заблокировать
            </Button>
          </DialogActions>
        </Dialog>
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

export default withStyles(styles)(CustomerCard);
