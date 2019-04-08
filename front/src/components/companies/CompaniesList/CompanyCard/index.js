import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

function CompanyCard(props) {
  const { classes, company } = props;
  console.log(company);
  return (
    <div className={classes.listItem}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={company.companyName}
          secondary={
            <React.Fragment>
              <Typography color="textPrimary">
                <b>City:</b> {company.city}
              </Typography>
              <Typography color="textPrimary">
                <b>Rating:</b> {company.rating}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </div>
  );
}

const styles = theme => ({
  listItem: {
    borderBottom: "2px solid rgba(245,0,87,0.1)",
    borderRadius: '2%'
  }
});

export default withStyles(styles)(CompanyCard);
