import React from "react";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

function Profile(props) {
  const goBack = () => {
    props.history.goBack();
  };

  const { classes } = props;
  return (
    <div className={classes.container}>
      <Button
        to="/auth"
        component={Link}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        На страницу авторизации
      </Button>
      <Button onClick={goBack} color="primary">
        Назад
      </Button>
    </div>
  );
}

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap"
  },
  button: {
    margin: theme.spacing.unit
  }
});

export default withRouter(withStyles(styles)(Profile));
