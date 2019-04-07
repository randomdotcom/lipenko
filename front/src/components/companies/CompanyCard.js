import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

function CompanyCard(props) {
  const { classes, company } = props;
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={company.companyName}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              className={classes.inline}
              color="textPrimary"
            >
              {company.description}
            </Typography>
            {" — I'll be in your neighborhood doing errands this…"}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

const styles = theme => ({
  inline: {
    display: "inline"
  }
});

export default withStyles(styles)(CompanyCard);
