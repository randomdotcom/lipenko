import React from "react";
import {
  TextField,
  withStyles,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button
} from "@material-ui/core";
import { withFormik } from "formik";
import { string, object } from "yup";
import { fetchRegisterExecutor, fetchConfirmUser } from "../../../fetches/auth";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const validationSchema = object().shape({
  username: string()
    .required("Username is required")
    .min(2, "Username must contain atleast 2 characters")
    .max(9, "Username must contain less then 9 characters")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9-_.]{1,9}$/,
      "The username can contain letters, numbers, -, ., _"
    ),
  password: string()
    .required("Enter your password")
    .min(5, "Password must contain atleast 5 characters")
    .max(18, "Password must contain less then 18 characters")
    .matches(/^[\S]{5,18}$/, "The password cannot contain spaces"),
  confirmPassword: string()
    .required("Enter your password again")
    .test("passwords-match", "Passwords must match ya fool", function(value) {
      return this.parent.password === value;
    }),
  email: string()
    .required("Email is required")
    .min(5, "Email must contain atleast 5 characters")
    .max(20, "Email must contain less then 20 characters")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "The email is incorrect"
    ),
  phoneNumber: string()
    .required("Phone number is required")
    .min(13, "Phone number is incorrect")
    .max(13, "Phone number is incorrect"),
  city: string()
    .required("")
    .min(3, "City name must contain atleast 3 characters")
    .max(14, "City name must contain less then 14 characters")
    .matches(
      /^[A-Za-z-]{3,14}$/,
      "City name can contain only letters, -, numbers"
    ),
  companyName: string()
    .required("Company name is required")
    .min(3, "Company name must contain atleast 3 characaters")
    .max(14, "Company name must contain less then 14 characters"),
  description: string().max(
    80,
    "Description msut contain less then 80 characters"
  ),
  standartSmallRoom: string().matches(
    /^\d{1,5}$/,
    "Field length must be atleast 1 character, you can type `0`"
  ),
  standartBigRoom: string().matches(
    /^\d{1,5}$/,
    "Field length must be atleast 1 character, you can type `0`"
  ),
  standartBathRoom: string().matches(
    /^\d{1,5}$/,
    "Field length must be atleast 1 character, you can type `0`"
  ),
  generalBathRoom: string().matches(
    /^\d{1,5}$/,
    "Field length must be atleast 1 character, you can type `0`"
  ),
  generalBigRoom: string().matches(
    /^\d{1,5}$/,
    "Field length must be atleast 1 character, you can type `0`"
  ),
  generalSmallRoom: string().matches(
    /^\d{1,5}$/,
    "Field length must be atleast 1 character, you can type `0`"
  ),
  afterRepairBathRoom: string().matches(
    /^\d{1,5}$/,
    "Field length must be atleast 1 character, you can type `0`"
  ),
  afterRepairBigRoom: string().matches(
    /^\d{1,5}$/,
    "Field length must be atleast 1 character, you can type `0`"
  ),
  afterRepairSmallRoom: string().matches(
    /^\d{1,5}$/,
    "Field length must be atleast 1 character, you can type `0`"
  ),
  smallCarpet: string().matches(
    /^\d{1,5}$/,
    "Field length must be atleast 1 character, you can type `0`"
  ),
  bigCarpet: string().matches(
    /^\d{1,5}$/,
    "Field length must be atleast 1 character, you can type `0`"
  ),
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

const executorSignUp = props => {
  const { classes } = props;
  const { values, errors, handleChange, handleBlur, handleSubmit } = props;

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <Grid container justify="center" spacing={24}>
        <Grid item justify="center" container className={classes.mainInfo}>
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
            label="Password"
            autoComplete="new-password"
            bled={props.isSended}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            helperText={errors.password}
            error={Boolean(errors.password)}
          />
          <TextField
            label="Confirm password"
            autoComplete="new-password"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            helperText={errors.confirmPassword}
            error={Boolean(errors.confirmPassword)}
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
            label="Descrition"
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
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
            helperText={errors.city}
            error={Boolean(errors.city)}
          />
        </Grid>
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
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  key="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                >
                  SIGN UP
                </Button>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    flexGrow: 1,
    marginBottom: 25
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250
  },
  textFieldFullWidth: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  mainInfo: {
    maxWidth: 560
  }
});

export default withStyles(styles)(
  withFormik({
    mapPropsToValues: () => ({
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      description: "",
      city: "",
      standartSmallRoom: 0,
      standartBigRoom: 0,
      standartBathRoom: 0,
      generalBathRoom: 0,
      generalBigRoom: 0,
      generalSmallRoom: 0,
      afterRepairBathRoom: 0,
      afterRepairBigRoom: 0,
      afterRepairSmallRoom: 0,
      smallCarpet: 0,
      bigCarpet: 0,
      office: 0,
      furniture: 0,
      industrial: 0,
      pool: 0
    }),

    validationSchema: validationSchema,

    handleSubmit: (values, { setFieldError }) => {
      try {
        if (!this.state.isSended) {
          fetchRegisterExecutor.call(
            this,
            values.username,
            values.password,
            values.email,
            values.phoneNumber,
            values.typesOfCleaning
          );
        } else {
          fetchConfirmUser.call(this, this.state.verificationCode);
        }
      } catch (errors) {
        errors.forEach(err => {
          setFieldError(err.field, err.error);
        });
      }
    },

    displayName: "executorSignUp"
  })(executorSignUp)
);
