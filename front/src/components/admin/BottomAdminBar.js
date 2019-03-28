import React, { Component } from 'react';
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from "@material-ui/core/styles";

class BottomAdminBar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <NavLink to="/userlist" activeClassName="selected">UserList</NavLink>
                    <NavLink to="/companylist" activeClassName="selected">CompanyList</NavLink>
                </Toolbar>
            </AppBar>
        )
    }
}

const styles = theme => ({
    text: {
        paddingTop: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});

BottomAdminBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomAdminBar);