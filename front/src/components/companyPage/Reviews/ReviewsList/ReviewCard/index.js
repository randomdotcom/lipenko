import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

function ReviewCard(props) {
  const { classes, review } = props;

  const updatedAt = new Date(review.updated_at);
  const reviewDate =
    updatedAt.getDate() +
    "." +
    updatedAt.getMonth() +
    "." +
    updatedAt.getFullYear() +
    " " +
    updatedAt.getHours() +
    ":" +
    updatedAt.getMinutes();

  return (
    <div className={classes.listItem}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={<i>{reviewDate}</i>}
          secondary={
            <>
              <Typography component="span" color="textPrimary">
                <b>Rating:</b> {review.rating}
              </Typography>
              <Typography component="span" color="textPrimary">
                <b>Comment:</b> {review.comment}
              </Typography>
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
  button: {
    margin: theme.spacing.unit
  }
});

export default withStyles(styles)(ReviewCard);
