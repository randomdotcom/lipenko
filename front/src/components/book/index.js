import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import BookingForm from "./BookingForm";
import validationSchema from "./BookingFormValidation";

class Book extends Component {
  render() {
    const {
      adress,
      type,
      smallRooms,
      bigRooms,
      bathRooms,
      squareMeters,
      service,
      smallCarpets,
      bigCarpets,
      startDate,
      expectedTime,
      regularity,
      recurrence,
      email,
      company,
      cleaningDays
    } = this.props;
    return (
      <Formik
        initialValues={{
          adress: adress ? adress : "",
          type: type ? type : "standart",
          squareMeters: squareMeters ? squareMeters : 0,
          smallRooms: smallRooms ? smallRooms : 0,
          bigRooms: bigRooms ? bigRooms : 0,
          bathRooms: bathRooms ? bathRooms : 0,
          service: service ? service : [],
          smallCarpets: smallCarpets ? smallCarpets : 0,
          bigCarpets: bigCarpets ? bigCarpets : 0,
          startDate: startDate ? startDate : Date.now(),
          expectedTime: expectedTime ? expectedTime : Date.now(),
          cleaningDays: cleaningDays ? cleaningDays : [],
          regularity: regularity ? regularity : 0,
          recurrence: recurrence ? recurrence : 0,
          email: email ? email : '',
          company: company ? company : undefined,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setFieldError }) => {
          try {
          } catch (errors) {
            console.log(errors);
            errors.forEach(err => {
              setFieldError(err.field, err.error);
            });
          }
        }}
        component={BookingForm}
      />
    );
  }
}

const mapStateToProps = state => ({
  //adress: state.order.adress ? state.order.adress : undefined,
  //type: state.order.type ? state.order.type : undefined,
  email: state.profile.data.email ? state.profile.data.email : undefined,
  company: state.order.company ? state.order.company : undefined
});

export default connect(mapStateToProps)(Book);
