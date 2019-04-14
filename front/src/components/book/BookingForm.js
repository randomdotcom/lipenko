import React from "react";
import { Field, Form } from "formik";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from "@material-ui/core";
import { Select } from "material-ui-formik-components/Select";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers";
import querySetParam from "../../services/query";

function BookingForm(props) {
  const {
    classes,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors
  } = props;

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form className={classes.container} onSubmit={handleSubmit}>
          <TextField
            required
            id="city"
            label="City"
            className={classes.input}
            value={values.city}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            required
            id="adress"
            label="Adress"
            className={classes.input}
            value={values.adress}
            onChange={handleChange}
            margin="normal"
          />
          <Field
            required
            fullWidth={false}
            name="type"
            label="Type of cleaning"
            className={classes.input}
            options={[
              { value: "standart", label: "Standart" },
              { value: "general", label: "General" },
              { value: "afterRepair", label: "After repair" },
              { value: "office", label: "Office" },
              { value: "industrial", label: "Industrial" }
            ]}
            component={Select}
          />
          {(values.type === "standart") |
          (values.type === "general") |
          (values.type === "afterRepair") ? (
            <>
              <TextField
                required
                id="smallRooms"
                label="Small rooms count"
                className={classes.input}
                value={values.smallRooms}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                required
                id="bigRooms"
                label="Big rooms count"
                className={classes.input}
                value={values.bigRooms}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                required
                id="bathRooms"
                label="Bathrooms count"
                className={classes.input}
                value={values.bathRooms}
                onChange={handleChange}
                margin="normal"
              />
            </>
          ) : (values.type === "office") | (values.type === "industrial") ? (
            <TextField
              required
              id="squareMeters"
              label="Size (square meters)"
              className={classes.input}
              value={values.squareMeters}
              onChange={handleChange}
              margin="normal"
            />
          ) : null}
          <Field
            multiple
            name="service"
            label="Other service"
            options={[
              { value: "pool", label: "Pool cleaning" },
              { value: "carpet", label: "Carpet cleaning" },
              { value: "furniture", label: "Furniture cleaning" }
            ]}
            component={Select}
          />
          {values.service.indexOf("carpet") !== -1 ? (
            <>
              <TextField
                required
                id="smallCarpets"
                label="Small carpet count"
                className={classes.input}
                value={values.smallCarpets}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                required
                id="bigCarpets"
                label="Big carpet count"
                className={classes.input}
                value={values.bigCarpets}
                onChange={handleChange}
                margin="normal"
              />
            </>
          ) : null}
          <DatePicker
            id="startDate"
            value={values.startDate}
            onChange={handleChange}
            disablePast
            className={classes.input}
            label="Start date"
          />
          <TimePicker
            id="expectedTime"
            value={values.exptectedTime}
            onChange={handleChange}
            className={classes.input}
            label="Expected time of cleaning"
          />
          <Field
            required
            multiple
            fullWidth={false}
            className={classes.input}
            name="cleaningDays"
            label="Cleaning days"
            options={[
              { value: 0, label: "Sunday" },
              { value: 1, label: "Monday" },
              { value: 2, label: "Tuesday" },
              { value: 3, label: "Wednesday" },
              { value: 4, label: "Thursday" },
              { value: 5, label: "Friday" },
              { value: 6, label: "Saturday" }
            ]}
            component={Select}
          />
          <Field
            required
            fullWidth={false}
            className={classes.input}
            name="regularity"
            label="Regularity"
            options={[
              { value: 0, label: "Once" },
              { value: 1, label: "Every week" },
              { value: 2, label: "Every 2 weeks" },
              { value: 3, label: "Every month" }
            ]}
            component={Select}
          />
          {values.regularity !== 0 ? (
            <Field
              required
              fullWidth={false}
              className={classes.input}
              name="recurrence"
              label="Recurrence"
              options={[
                { value: 1, label: "2 weeks" },
                { value: 2, label: "1 month" },
                { value: 3, label: "2 month" },
                { value: 4, label: "3 month" },
                { value: 5, label: "4 month" },
                { value: 6, label: "5 month" },
                { value: 7, label: "6 month" }
              ]}
              component={Select}
            />
          ) : null}

          {values.email ? null : (
            <TextField
              required
              id="email"
              label="Email"
              className={classes.input}
              value={values.email}
              onChange={handleChange}
              margin="normal"
            />
          )}
          {values.company ? (
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Заказать услугу
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Рассмотреть предложения
            </Button>
          )}
        </form>
      </MuiPickersUtilsProvider>
    </div>
  );
}

const styles = theme => ({
  root: {
    marginTop: 20,
    backgroundColor: "whitesmoke",
    boxShadow: "0 1px 7px 1px rgba(0, 0, 0, .25)",
    padding: 25,
    fontSize: "1.2rem",
    display: "flex",
    justifyContent: "center"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: 550
  },
  input: {
    width: 240,
    marginRight: 24
  }
});

export default withStyles(styles)(BookingForm);
