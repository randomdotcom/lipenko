import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Formik } from "formik";
import { string, object } from "yup";
import UploadLogo from "../../../containers/profile/edit/UploadLogoContainer";

const validationEditMain = object().shape({
  username: string()
    .required("Username is required")
    .min(2, "Username must contain atleast 2 characters")
    .max(9, "Username must contain less then 9 characters")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9-_.]{1,9}$/,
      "The username can contain letters, numbers, -, ., _"
    ),
  email: string()
    .required("Email is required")
    .min(5, "Email must contain atleast 5 characters")
    .max(50, "Email must contain less then 50 characters")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "The email is incorrect"
    ),
  phoneNumber: string()
    .required("Phone number is required")
    .min(13, "Phone number is incorrect")
    .max(13, "Phone number is incorrect"),
  city: string()
    .required("City name is required")
    .min(3, "City name must contain atleast 3 characters")
    .max(14, "City name must contain less then 14 characters")
    .matches(
      /^[A-Za-z-]{3,14}$/,
      "City name can contain only letters, -, numbers"
    ),
  companyName: string()
    .required("Company name is required")
    .min(3, "Company name must contain atleast 3 characaters")
    .max(20, "Company name must contain less then 14 characters"),
  description: string().max(
    80,
    "Description msut contain less then 80 characters"
  )
});

const validationNewPassword = object().shape({
  oldPassword: string()
    .required("Enter your password")
    .min(5, "Password must contain atleast 5 characters")
    .max(18, "Password must contain less then 18 characters")
    .matches(/^[\S]{5,18}$/, "The password cannot contain spaces"),
  newPassword: string()
    .required("Enter your password")
    .min(5, "Password must contain atleast 5 characters")
    .max(18, "Password must contain less then 18 characters")
    .matches(/^[\S]{5,18}$/, "The password cannot contain spaces"),
  confirmNewPassword: string()
    .required("Enter your password again")
    .test("passwords-match", "Passwords must match ya fool", function(value) {
      return this.parent.newPassword === value;
    })
});

const validationTOC = object().shape({
  standartSmallRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  standartBigRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  standartBathRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  generalBathRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  generalBigRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  generalSmallRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  afterRepairBathRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  afterRepairBigRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  afterRepairSmallRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  smallCarpet: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  bigCarpet: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  office: string().matches(
    /^\d{1,5}$/,
    "Field length must be atleast 1 character, you can type `0`"
  ),
  furniture: string().matches(
    /^\d{1,5}$/,
    "Field length must be atleast 1 character, you can type `0`"
  ),
  industrial: string().matches(
    /^\d{1,5}$/,
    "Field length must be atleast 1 character, you can type `0`"
  ),
  pool: string().matches(
    /^\d{1,5}$/,
    "Field length must be atleast 1 character, you can type `0`"
  )
});

class ExecutorProfileEdit extends Component {
  render() {
    const {
      classes,
      username,
      email,
      phoneNumber,
      city,
      companyName,
      description,
      standartSmallRoom,
      standartBigRoom,
      standartBathRoom,
      generalBathRoom,
      generalBigRoom,
      generalSmallRoom,
      afterRepairBathRoom,
      afterRepairBigRoom,
      afterRepairSmallRoom,
      smallCarpet,
      bigCarpet,
      office,
      furniture,
      industrial,
      pool
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.mainInfoAndPassword}>
          <Formik
            initialValues={{
              username,
              email,
              phoneNumber,
              city,
              companyName,
              description
            }}
            validationSchema={validationEditMain}
            onSubmit={(
              { username, email, phoneNumber, city, companyName, description },
              { setFieldError }
            ) => {
              try {
                this.props.editMainExecutor({
                  username,
                  email,
                  phoneNumber,
                  city,
                  companyName,
                  description
                });
              } catch (errors) {
                errors.forEach(err => {
                  setFieldError(err.field, err.error);
                });
              }
            }}
            component={this.EditMainInfo}
          />
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmNewPassword: ""
            }}
            validationSchema={validationNewPassword}
            onSubmit={({ oldPassword, newPassword }, { setFieldError }) => {
              try {
                this.props.changePasswordExecutor({ oldPassword, newPassword });
              } catch (errors) {
                console.log(errors);
                errors.forEach(err => {
                  setFieldError(err.field, err.error);
                });
              }
            }}
            component={this.NewPasswordForm}
          />
        </div>
        <UploadLogo />
        <Formik
          initialValues={{
            standartSmallRoom,
            standartBigRoom,
            standartBathRoom,
            generalBathRoom,
            generalBigRoom,
            generalSmallRoom,
            afterRepairBathRoom,
            afterRepairBigRoom,
            afterRepairSmallRoom,
            smallCarpet,
            bigCarpet,
            office,
            furniture,
            industrial,
            pool
          }}
          validationSchema={validationTOC}
          onSubmit={(values, { setFieldError }) => {
            try {
              this.props.editTypesOfCleaningExecutor(values);
            } catch (errors) {
              errors.forEach(err => {
                setFieldError(err.field, err.error);
              });
            }
          }}
          component={this.TypesOfCleaningForm}
        />
      </div>
    );
  }

  EditMainInfo = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors
  }) => {
    const { classes } = this.props;
    return (
      <form className={classes.container} onSubmit={handleSubmit} noValidate>
        <TextField
          label="Username"
          autoComplete="username"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          helperText={errors.username}
          error={Boolean(errors.username)}
        />
        <TextField
          label="Email"
          autoComplete="email"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          helperText={errors.email}
          error={Boolean(errors.email)}
        />
        <TextField
          label="Phone number"
          autoComplete="tel"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="phoneNumber"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.phoneNumber}
          helperText={errors.phoneNumber}
          error={Boolean(errors.phoneNumber)}
        />
        <TextField
          label="Company name"
          autoComplete="text"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="companyName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.companyName}
          helperText={errors.companyName}
          error={Boolean(errors.companyName)}
        />
        <TextField
          label="Description"
          autoComplete="tel"
          className={classes.textFieldFullWidth}
          margin="normal"
          variant="outlined"
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          helperText={errors.description}
          error={Boolean(errors.description)}
          multiline
          rowsMax="4"
          fullWidth
        />
        <TextField
          label="City"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="city"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.city}
          helperText={errors.city}
          error={Boolean(errors.city)}
        />
        <Button
          key="submit"
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          CONFIRM
        </Button>
      </form>
    );
  };

  NewPasswordForm = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors
  }) => {
    const { classes } = this.props;
    return (
      <form className={classes.container} onSubmit={handleSubmit} noValidate>
        <TextField
          label="Old password"
          autoComplete="new-password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="password"
          name="oldPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.oldPassword}
          helperText={errors.oldPassword}
          error={Boolean(errors.oldPassword)}
        />
        <TextField
          label="New password"
          autoComplete="new-password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="password"
          name="newPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.newPassword}
          helperText={errors.newPassword}
          error={Boolean(errors.newPassword)}
        />
        <TextField
          label="Confirm new password"
          autoComplete="new-password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="password"
          name="confirmNewPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmNewPassword}
          helperText={errors.confirmNewPassword}
          error={Boolean(errors.confirmNewPassword)}
        />
        <Button
          key="submit"
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          CHANGE PASSWORD
        </Button>
      </form>
    );
  };

  TypesOfCleaningForm = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors
  }) => {
    const { classes } = this.props;
    return (
      <form className={classes.container} onSubmit={handleSubmit} noValidate>
        <Grid container justify="center" spacing={24}>
          <Grid item>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                Standart cleaning
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div flexwrap="true">
                  <TextField
                    label="Price per small room"
                    autoComplete="tel"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="standartSmallRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.standartSmallRoom}
                    helperText={errors.standartSmallRoom}
                    error={Boolean(errors.standartSmallRoom)}
                  />
                  <TextField
                    label="Price per big room"
                    autoComplete="tel"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="standartBigRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.standartBigRoom}
                    helperText={errors.standartBigRoom}
                    error={Boolean(errors.standartBigRoom)}
                  />
                  <TextField
                    label="Price per bathroom"
                    autoComplete="tel"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="standartBathRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.standartBathRoom}
                    helperText={errors.standartBathRoom}
                    error={Boolean(errors.standartBathRoom)}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                General cleaning
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div flexwrap="true">
                  <TextField
                    label="Price per small room"
                    autoComplete="tel"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="generalSmallRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.generalSmallRoom}
                    helperText={errors.generalSmallRoom}
                    error={Boolean(errors.generalSmallRoom)}
                  />
                  <TextField
                    label="Price per big room"
                    autoComplete="tel"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="generalBigRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.generalBigRoom}
                    helperText={errors.generalBigRoom}
                    error={Boolean(errors.generalBigRoom)}
                  />
                  <TextField
                    label="Price per bathroom"
                    autoComplete="tel"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="generalBathRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.generalBathRoom}
                    helperText={errors.generalBathRoom}
                    error={Boolean(errors.generalBathRoom)}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                After repair cleaning
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div flexwrap="true">
                  <TextField
                    label="Price per small room"
                    autoComplete="tel"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="afterRepairSmallRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.afterRepairSmallRoom}
                    helperText={errors.afterRepairSmallRoom}
                    error={Boolean(errors.afterRepairSmallRoom)}
                  />
                  <TextField
                    label="Price per big room"
                    autoComplete="tel"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="afterRepairBigRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.afterRepairBigRoom}
                    helperText={errors.afterRepairBigRoom}
                    error={Boolean(errors.afterRepairBigRoom)}
                  />
                  <TextField
                    label="Price per bathroom"
                    autoComplete="tel"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="afterRepairBathRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.afterRepairBathRoom}
                    helperText={errors.afterRepairBathRoom}
                    error={Boolean(errors.afterRepairBathRoom)}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                Carpet cleaning
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div flexwrap="true">
                  <TextField
                    label="Price per small carpet"
                    autoComplete="tel"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="smallCarpet"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.smallCarpet}
                    helperText={errors.smallCarpet}
                    error={Boolean(errors.smallCarpet)}
                  />
                  <TextField
                    label="Price per big carpet"
                    autoComplete="tel"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="bigCarpet"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bigCarpet}
                    helperText={errors.bigCarpet}
                    error={Boolean(errors.bigCarpet)}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                Other cleaning
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div flexwrap="true">
                  <TextField
                    label="Office cleaning, per square meter"
                    autoComplete="tel"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="office"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.office}
                    helperText={errors.office}
                    error={Boolean(errors.office)}
                  />
                  <TextField
                    label="Furniture cleaning"
                    autoComplete="tel"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="furniture"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.furniture}
                    helperText={errors.furniture}
                    error={Boolean(errors.furniture)}
                  />
                  <TextField
                    label="Industrial cleaning, per square meter"
                    autoComplete="tel"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="industrial"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.industrial}
                    helperText={errors.industrial}
                    error={Boolean(errors.industrial)}
                  />
                  <TextField
                    label="Pool cleaning, for one"
                    autoComplete="tel"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="pool"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pool}
                    helperText={errors.pool}
                    error={Boolean(errors.pool)}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Button
          key="submit"
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          CONFIRM
        </Button>
      </form>
    );
  };
}

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    backgroundColor: "whitesmoke",
    boxShadow: "0 1px 7px 1px rgba(0, 0, 0, .25)",
    padding: 25,
    fontSize: "1.2rem"
  },
  mainInfoAndPassword: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    flexGrow: 1
  }
});

export default withStyles(styles)(ExecutorProfileEdit);
