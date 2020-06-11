import React from "react";
import { Field } from "formik";
import { Link } from "react-router-dom";
import { TextField, Button, Typography } from "@material-ui/core";
import { Select } from "material-ui-formik-components/Select";
import { withStyles } from "@material-ui/core/styles";
import LuxonUtils from "@date-io/luxon";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { minsToHours } from "../../services/utils";

function BookingForm(props) {
  const {
    classes,
    handleSubmit,
    handleChange,
    values,
    errors,
    typesOfCleaning
  } = props;

  function handleCalcPrice() {
    props.calculateTimePrice({ values, typesOfCleaning });
  }

  const datePickerComponent = ({
    form: { setFieldValue },
    field: { name, value }
  }) => (
    <DatePicker
      id="startDate"
      name={name}
      value={value}
      onChange={value => setFieldValue(name, value)}
      format="dd/MM/yyyy"
      disablePast
      className={classes.input}
      label="Дата начала уборок"
      showTodayButton
      okLabel="OK"
      cancelLabel="ОТМЕНИТЬ"
      todayLabel="СЕГОДНЯ"
      autoOk
    />
  );

  const timePickerComponent = ({
    form: { setFieldValue },
    field: { name, value }
  }) => (
    <TimePicker
      id="expectedTime"
      value={value}
      onChange={value => setFieldValue(name, value)}
      className={classes.input}
      label="Ожидаемое время уборок"
      ampm={false}
      okLabel="OK"
      cancelLabel="ОТМЕНИТЬ"
    />
  );

  let availableWorkingDays = [];
  if (props.availableWorkingDays) {
    if (props.availableWorkingDays["0"])
      availableWorkingDays.push({ value: 0, label: "Воскресенье" });
    if (props.availableWorkingDays["1"])
      availableWorkingDays.push({ value: 1, label: "Понедельник" });
    if (props.availableWorkingDays["2"])
      availableWorkingDays.push({ value: 2, label: "Вторник" });
    if (props.availableWorkingDays["3"])
      availableWorkingDays.push({ value: 3, label: "Среда" });
    if (props.availableWorkingDays["4"])
      availableWorkingDays.push({ value: 4, label: "Четверг" });
    if (props.availableWorkingDays["5"])
      availableWorkingDays.push({ value: 5, label: "Пятница" });
    if (props.availableWorkingDays["6"])
      availableWorkingDays.push({ value: 6, label: "Суббота" });
  }

  let availableServices = [];
  let availableTypes = [];
  if (typesOfCleaning) {
    if (typesOfCleaning.pool > 0)
      availableServices.push({ value: "pool", label: "Чистка бассейна" });
    if (typesOfCleaning.carpet.isAvailable)
      availableServices.push({ value: "carpet", label: "Чистка ковров" });
    if (typesOfCleaning.furniture > 0)
      availableServices.push({
        value: "furniture",
        label: "Чистка мебели"
      });

    if (typesOfCleaning.standart.isAvailable)
      availableTypes.push({ value: "standart", label: "Обычная" });
    if (typesOfCleaning.general.isAvailable)
      availableTypes.push({ value: "general", label: "Генеральная" });
    if (typesOfCleaning.afterRepair.isAvailable)
      availableTypes.push({ value: "afterRepair", label: "После ремонта" });
    if (typesOfCleaning.office > 0)
      availableTypes.push({ value: "office", label: "Чистка офиса" });
    if (typesOfCleaning.industrial > 0)
      availableTypes.push({ value: "industrial", label: "Промышленная" });
  }

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <form className={classes.container} onSubmit={handleSubmit}>
          {!props.company ? (
            <TextField
              required
              id="city"
              label="Город"
              className={classes.input}
              value={values.city}
              onChange={handleChange}
              margin="normal"
            />
          ) : null}
          <TextField
            required
            id="adress"
            label="Адрес"
            className={classes.input}
            value={values.adress}
            onChange={handleChange}
            margin="normal"
          />
          <Field
            required
            fullWidth={false}
            name="type"
            label="Вид уборки"
            className={classes.input}
            options={
              props.company
                ? availableTypes
                : [
                    { value: "standart", label: "Обычная" },
                    { value: "general", label: "Генеральная" },
                    { value: "afterRepair", label: "После ремонта" },
                    { value: "office", label: "Чистка офиса" },
                    { value: "industrial", label: "Промышленная" }
                  ]
            }
            component={Select}
          />
          {(values.type === "standart") |
          (values.type === "general") |
          (values.type === "afterRepair") ? (
            <>
              <TextField
                required
                id="smallRooms"
                label="Кол-во маленьких комнат"
                className={classes.input}
                value={values.smallRooms}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                required
                id="bigRooms"
                label="Кол-во больших комнат"
                className={classes.input}
                value={values.bigRooms}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                required
                id="bathRooms"
                label="Кол-во санузлов"
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
              label="Размер (кв. м.)"
              className={classes.input}
              value={values.squareMeters}
              onChange={handleChange}
              margin="normal"
            />
          ) : null}
          <Field
            multiple
            name="service"
            label="Другие услуги"
            options={
              props.company
                ? availableServices
                : [
                    { value: "pool", label: "Чистка бассейна" },
                    { value: "carpet", label: "Чистка ковров" },
                    { value: "furniture", label: "Чистка мебели" }
                  ]
            }
            component={Select}
          />
          {values.service.indexOf("carpet") !== -1 ? (
            <>
              <TextField
                required
                id="smallCarpets"
                label="Кол-во маленьких ковров"
                className={classes.input}
                value={values.smallCarpets}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                required
                id="bigCarpets"
                label="Кол-во больших ковров"
                className={classes.input}
                value={values.bigCarpets}
                onChange={handleChange}
                margin="normal"
              />
            </>
          ) : null}
          <Field component={datePickerComponent} name="startDate" />
          <Field component={timePickerComponent} name="expectedTime" />
          <Field
            multiple
            fullWidth={false}
            className={classes.input}
            name="cleaningDays"
            label="Дни уборок"
            options={
              props.company
                ? availableWorkingDays
                : [
                    { value: 0, label: "Воскресенье" },
                    { value: 1, label: "Понедельник" },
                    { value: 2, label: "Вторник" },
                    { value: 3, label: "Среда" },
                    { value: 4, label: "Четверг" },
                    { value: 5, label: "Пятница" },
                    { value: 6, label: "Суббота" }
                  ]
            }
            component={Select}
          />
          <Field
            required
            fullWidth={false}
            className={classes.input}
            name="regularity"
            label="Регулярность"
            options={[
              { value: 0, label: "Один раз" },
              { value: 1, label: "Каждую неделю" },
              { value: 2, label: "Каждые 2 недели" },
              { value: 3, label: "Каждый месяц" }
            ]}
            component={Select}
          />
          {values.regularity !== 0 ? (
            <Field
              required
              fullWidth={false}
              className={classes.input}
              name="recurrence"
              label="Длительность"
              options={[
                { value: 1, label: "2 недели" },
                { value: 2, label: "1 месяц" },
                { value: 3, label: "2 месяца" },
                { value: 4, label: "3 месяца" },
                { value: 5, label: "4 месяца" },
                { value: 6, label: "5 месяцев" },
                { value: 7, label: "6 месяцев" }
              ]}
              component={Select}
            />
          ) : null}

          {props.isAuthenticated ? null : (
            <>
              <TextField
                required
                id="email"
                label="Электронная почта"
                className={classes.input}
                value={values.email}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                required
                label="Номер телефона"
                autoComplete="tel"
                className={classes.input}
                margin="normal"
                id="phoneNumber"
                name="phoneNumber"
                onChange={handleChange}
                value={values.phoneNumber}
                helperText={errors.phoneNumber}
                error={Boolean(errors.phoneNumber)}
              />
            </>
          )}
          {props.company ? (
            <>
              <Button
                onClick={handleCalcPrice}
                variant="outlined"
                color="primary"
                fullWidth
              >
                Рассчитать время и цену
              </Button>
              {props.time && props.price ? (
                <div className={classes.priceAndTime}>
                  <Typography className={classes.calcTitle}>
                    <b>Цена за уборку:</b> {props.price}р
                  </Typography>
                  <Typography className={classes.calcTitle}>
                    <b>Время:</b> {minsToHours(props.time)}
                  </Typography>
                </div>
              ) : null}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.button}
              >
                Подтвердить заказ
              </Button>
            </>
          ) : (
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Смотреть предложения
            </Button>
          )}
          {props.company ? (
            <>
              <Button
                component={Link}
                color="primary"
                to={{ pathname: `/companies/${props.company}` }}
              >
                Перейти к компании
              </Button>
              <Button onClick={props.resetSelectedCompany} color="secondary">
                Сбросить компанию
              </Button>
            </>
          ) : null}
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
  },
  button: {
    margin: theme.spacing.unit
  },
  priceAndTime: {
    display: "flex"
  },
  calcTitle: {
    marginLeft: 8,
    marginTop: 8
  }
});

export default withStyles(styles)(BookingForm);
