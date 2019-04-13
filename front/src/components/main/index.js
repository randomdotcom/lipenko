import React from "react";
import { connect } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles
} from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import indigo from "@material-ui/core/colors/indigo";

const Main = ({ isAuthenticated, username, classes, children }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.logoAndBook}>
            <span>CLEANING PLATFORM</span>
            <Button className={classes.bookButton} variant="contained"
              color="secondary"
            >book cleaning</Button>
          </Typography>
          <Button
            component={NavLink}
            to="/companies"
            activeClassName={classes.activeNavLink}
          >
            Companies
          </Button>
          {isAuthenticated ? (
            <Button
              component={NavLink}
              to="/profile"
              activeClassName={classes.activeNavLink}
            >
              {username}
            </Button>
          ) : (
              <Button component={Link} to="/auth" color="inherit">
                Login
            </Button>
            )}
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
  logoAndBook: {
    flexGrow: 1,
    alignItems: 'center'
  },
  bookButton: {
    marginLeft: 15
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  activeNavLink: {
    backgroundColor: indigo.A100
  }
};

const mapStateToProps = state => ({
  isAuthenticated: state.profile.isAuthenticated,
  username: state.profile.isAuthenticated === true ? state.profile.data.username : undefined,
  error: state.profile.isAuthenticated === true ? state.errors.message : undefined
});

const MainContainer = connect(mapStateToProps)(Main);

export default withStyles(styles)(MainContainer);
