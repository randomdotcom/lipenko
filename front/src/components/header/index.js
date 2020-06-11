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
import { withRouter } from "react-router-dom";
import "./index.css";

const Main = ({
  role,
  history,
  isAuthenticated,
  username,
  classes,
  children
}) => {
  const handleClickBookCleaning = () => {
    history.push("/book");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className="headerContainer">
        <Toolbar className="content">
          <Typography
            variant="h6"
            color="inherit"
            className={classes.logoAndBook}
          >
            <span>CLEANING PLATFORM</span>
            {role !== "executor" ? (
              <Button
                className={classes.bookButton}
                variant="contained"
                color="secondary"
                onClick={handleClickBookCleaning}
              >
                {role === "user" ? (
                  <span>заказать уборку</span>
                ) : (
                  <span>заказать уборку как гость</span>
                )}
              </Button>
            ) : null}
          </Typography>
          <Button
            component={NavLink}
            to="/companies"
            activeClassName={classes.activeNavLink}
          >
            КОМПАНИИ
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
              Вход
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div className="contentContainer">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

const styles = {
  root: {
    flexGrow: 1
  },
  logoAndBook: {
    flexGrow: 1,
    alignItems: "center"
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
  role: state.profile.role,
  username:
    state.profile.isAuthenticated === true
      ? state.profile.data.username
      : undefined
});

const MainContainer = connect(mapStateToProps)(Main);

export default withRouter(withStyles(styles)(MainContainer));
