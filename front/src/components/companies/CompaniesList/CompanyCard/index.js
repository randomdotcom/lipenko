import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function CompanyCard(props) {
  const { classes, company } = props;
  return (
    <div className={classes.listItem}>
      <ListItem alignItems="flex-start">
        <Avatar
          alt="Logo"
          src="http://tabakup.by/wp-content/uploads/2018/10/logo-klining.jpg"
          className={classes.logo}
        />
        <ListItemText
          primary={company.companyName}
          secondary={
            <>
              <Typography component="span" color="textPrimary">
                <b>City:</b> {company.city}
              </Typography>
              <Typography component="span" color="textPrimary">
                <b>Rating:</b> {company.rating}
              </Typography>
              <Button
                component={Link}
                to={{
                  pathname: `/companies/${props.id}`
                }}
              >
                Заказать услугу
              </Button>
            </>
          }
        />
      </ListItem>
    </div>
  );
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
    width: 115,
    height: 115,
    boxShadow: theme.shadows[2]
  }
});

export default withStyles(styles)(CompanyCard);
