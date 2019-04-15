import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { changeFiltersCompanies } from "../../../actions/companies.actions";

const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  }
};

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }

  handleSubmit = () => {
    const query = this.props.search;
    const path = this.props.pathname;

    this.props.changeFiltersCompanies({
      query,
      name: "name",
      value: this.state.value,
      path
    });
  };

  handleChange = event => {
    this.setState({ value: event.target.value }, () => this.handleSubmit());
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase
          onChange={this.handleChange}
          className={classes.input}
          placeholder="Search For Company"
        />
        <IconButton
          className={classes.iconButton}
          aria-label="Search"
          key="submit"
          onClick={this.handleSubmit}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { changeFiltersCompanies }
)(withStyles(styles)(Search));
