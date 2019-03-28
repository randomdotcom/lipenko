import React, { Component } from 'react';
import BottomAdminBar from './BottomAdminBar'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

class Admin extends Component {

    render() {
        return (
            <>
             <BottomAdminBar />
            </>
        )
    }
}

const styles = theme => ({

});

Admin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);