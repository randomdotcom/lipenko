import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { SnackbarProvider } from "notistack";
import SwipeableViews from "react-swipeable-views";
import SignUpContainer from "./signUp";
import SignInContainer from "./signIn";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 24, paddingTop: 4 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <SnackbarProvider maxSnack={3}>
              <SignInContainer />
            </SnackbarProvider>
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <SnackbarProvider maxSnack={3}>
              <SignUpContainer />
            </SnackbarProvider>
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

const mapStateToProps = state => ({
  isAuthenticate: state.profile.isAuthenticate
});

const AuthContainer = connect(mapStateToProps)(Auth);

export default withStyles(styles, { withTheme: true })(AuthContainer);
