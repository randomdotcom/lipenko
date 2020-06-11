import React, { Component } from "react";
import { Formik, Field } from "formik";
import { string, object, array } from "yup";
import {
  TextField,
  withStyles,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button
} from "@material-ui/core";
import { Select } from "material-ui-formik-components/Select";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const validationSchema = object().shape({
  username: string()
    .required("Введите имя пользователя")
    .min(2, "Имя пользователя должно содержать хотябы 2 символа")
    .max(9, "Имя пользователя должно содержать меньше 10 символов")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9-_.]{1,9}$/,
      "Имя пользователя может содержать буквы, цифры, -, ., _"
    ),
  password: string()
    .required("Введите свой пароль")
    .min(5, "Пароль должен содержать больше 4 символов")
    .max(18, "Пароль должен содержать меньше 19 символов")
    .matches(/^[\S]{5,18}$/, "Пароль не может содержать пробелы"),
  confirmPassword: string()
    .required("Введите свой пароль еще раз")
    .test("passwords-match", "Пароли не совпадают", function (value) {
      return this.parent.password === value;
    }),
  email: string()
    .required("Введите электронную почту")
    .min(5, "Эл. почта должна содержать больше 4 символов")
    .max(50, "Эл. почта должна содержать меньше 51 символов")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Эл. почта неверная"
    ),
  phoneNumber: string()
    .required("Введите номер телефона")
    .min(13, "Номер телефона неверный")
    .max(13, "Номер телефона неверный"),
  city: string()
    .required("Введите название города")
    .min(3, "Название города должно содержать больше 2 симоволов")
    .max(14, "Название города должно содержать меньше 14 симоволов")
    .matches(
      /^[А-Яа-я-]{3,14}$/,
      "Название города может содержать только буквы, -, цифры"
    ),
  companyName: string()
    .required("Введите название компании")
    .min(3, "Название компании должно содержать больше 2 символов")
    .max(20, "Название компании должно содержать меньше 21 символа"),
  description: string().max(
    80,
    "Информация об организации должна содержать меньше 80 символов"
  ),
  workingDays: array()
    .min(1, "Компания должна иметь хотябы 1 рабочий день")
    .max(7, "Неверные данные"),
  standartSmallRoom: string().matches(/^\d{1,5}$/, "Неверная цена"),
  standartBigRoom: string().matches(/^\d{1,5}$/, "Неверная цена"),
  standartBathRoom: string().matches(/^\d{1,5}$/, "Неверная цена"),
  generalBathRoom: string().matches(/^\d{1,5}$/, "Неверная цена"),
  generalBigRoom: string().matches(/^\d{1,5}$/, "Неверная цена"),
  generalSmallRoom: string().matches(/^\d{1,5}$/, "Неверная цена"),
  afterRepairBathRoom: string().matches(/^\d{1,5}$/, "Неверная цена"),
  afterRepairBigRoom: string().matches(/^\d{1,5}$/, "Неверная цена"),
  afterRepairSmallRoom: string().matches(/^\d{1,5}$/, "Неверная цена"),
  smallCarpet: string().matches(/^\d{1,5}$/, "Неверная цена"),
  bigCarpet: string().matches(/^\d{1,5}$/, "Неверная цена"),
  office: string().matches(/^\d{1,5}$/, "Неверная цена"),
  furniture: string().matches(/^\d{1,5}$/, "Неверная цена"),
  industrial: string().matches(/^\d{1,5}$/, "Неверная цена"),
  pool: string().matches(/^\d{1,5}$/, "Неверная цена")
});

class ExecutorSignUp extends Component {
  handleMessage = (msg, variant) => {
    this.props.enqueueSnackbar(msg, { variant });
  };

  handleNewVerificationCode = () => {
    this.props.executorNewVerificationCode(this.props.username);
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Formik
          initialValues={{
            username: "",
            password: "",
            email: "",
            phoneNumber: "",
            companyName: "",
            description: "",
            city: "",
            workingDays: [],
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
          }}
          onSubmit={(values, { setFieldError }) => {
            try {
              this.props.signUpExecutor(values);
            } catch (errors) {
              errors.forEach(err => {
                setFieldError(err.field, err.error);
              });
            }
          }}
          validationSchema={validationSchema}
          render={({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            setFieldTouched
          }) => (
            <form className={classes.container} onSubmit={handleSubmit}>
              <Grid container justify="center" direction="column" spacing={24}>
                <Grid
                  item
                  justify="center"
                  container
                  className={classes.mainInfo}
                >
                  <TextField
                    label="Имя пользователя"
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
                    label="Пароль"
                    autoComplete="new-password"
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
                    label="Подтверждение пароля"
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
                    label="Электронная почта"
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
                    label="Номер телефона"
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
                    label="Название организации"
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
                    label="Информация об организации"
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
                    label="Город"
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
                  <Field
                    required
                    multiple
                    // variant="outlined"
                    className={classes.input}
                    name="workingDays"
                    label="Рабочие дни"
                    options={[
                      { value: 0, label: "Воскресенье" },
                      { value: 1, label: "Понедельник" },
                      { value: 2, label: "Вторник" },
                      { value: 3, label: "Среда" },
                      { value: 4, label: "Четверг" },
                      { value: 5, label: "Пятница" },
                      { value: 6, label: "Суббота" }
                    ]}
                    component={Select}
                  />
                </Grid>
                <Grid
                  container
                  justify="center"
                  direction="column"
                  className={classes.mainInfo}
                >
                  <Grid item justify="center" direction="column" className={classes.expandableItems}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        Обычная уборка
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div flexwrap="true">
                          <TextField
                            label="Цена за маленькую комнату"
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
                            label="Цена за большую комнату"
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
                            label="Цена за санузел"
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
                  <Grid item className={classes.expandableItems}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        Генеральная уборка
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div flexwrap="true">
                          <TextField
                            label="Цена за маленькую комнату"
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
                            label="Цена за большую комнату"
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
                            label="Цена за санузел"
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
                  <Grid item className={classes.expandableItems}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        Уборка после ремонта
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div flexwrap="true">
                          <TextField
                            label="Цена за маленькую комнату"
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
                            label="Цена за большую комнату"
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
                            label="Цена за санузел"
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
                  <Grid item className={classes.expandableItems}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        Чистка ковров
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div flexwrap="true">
                          <TextField
                            label="Цена за маленький ковер"
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
                            label="Цена за большой ковер"
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
                  <Grid item className={classes.expandableItems}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        Другие услуги
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div flexwrap="true">
                          <TextField
                            label="Уборка офиса, цена за кв. м."
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
                            label="Чистка мебели"
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
                            label="Промышленная уборка, цена за кв.м."
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
                            label="Чистка бассейна"
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
                  onClick={handleSubmit}
                  type="submit"
                  key="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                >
                  ЗАРЕГИСТРИРОВАТЬСЯ
                </Button>
              </Grid>
            </form>
          )}
        />
      </>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    flexGrow: 1
    //marginBottom: 25
  },
  button: {
    margin: theme.spacing.unit
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
    maxWidth: 860
  },
  expandableItems: {
    marginBottom: 12
  }
});

export default withStyles(styles)(ExecutorSignUp);
