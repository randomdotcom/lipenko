import React, { Component } from "react";
import List from "@material-ui/core/List";
import { withStyles, Button } from "@material-ui/core";
import ReviewsList from "./ReviewsList";
import Loading from "../../common/Loading";

class Reviews extends Component {
  componentDidMount() {
    const { id } = this.props;
    if (!this.props.reviews.docs) {
      this.props.loadReviews({ page: 1, companyId: id });
    }
  }

  handleLoadMore = () => {
    const { id } = this.props;
    this.props.loadMoreReviews({ page: this.props.page + 1, companyId: id });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.listAndFilters}>
          <div className={classes.sortAndList}>
            <List className={classes.list}>
              {this.props.reviews ? (
                <ReviewsList reviews={this.props.reviews} />
              ) : (
                <Loading />
              )}
            </List>
          </div>
        </div>
        {this.props.total > this.props.limit * this.props.page ? (
          <Button
            onClick={this.handleLoadMore}
            variant="outlined"
            color="primary"
          >
            Load more
          </Button>
        ) : null}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    marginTop: 20,
    backgroundColor: "whitesmoke",
    boxShadow: "0 1px 7px 1px rgba(0, 0, 0, .1)",
    border: "1px solid rgba(0, 0, 0, .15)",
    borderRadius: "4px",
    padding: 25,
    paddingTop: 8
  },
  listAndFilters: {
    display: "flex",
    justifyContent: "space-between"
  },
  list: {
    width: "100%",
    paddingTop: 0
  },
  inline: {
    display: "inline"
  },
  sortAndList: {
    width: "100%"
  }
});

export default withStyles(styles)(Reviews);
