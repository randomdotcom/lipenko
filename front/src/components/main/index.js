import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles
} from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import indigo from "@material-ui/core/colors/indigo";

const Main = ({ classes, children }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            CLEANING PLATFORM
          </Typography>
          <Button
            component={NavLink}
            to="/profile"
            activeClassName={classes.activeNavLink}
          >
            Profile
          </Button>
          <Button
            component={NavLink}
            to="/companies"
            activeClassName={classes.activeNavLink}
          >
            Companies
          </Button>
          <Button component={Link} to="/auth" color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  activeNavLink: {
    backgroundColor: indigo.A100
  }
};

export default withStyles(styles)(Main);
