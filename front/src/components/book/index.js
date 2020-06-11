import React, { Component } from "react";
import { Formik } from "formik";
import BookingForm from "../../containers/book/BookingFormContainer";

export default class Book extends Component {
  render() {
    const {
      city,
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
          city: city ? city : "",
          adress: adress ? adress : "",
          type: type ? type : "standart",
          squareMeters: squareMeters ? squareMeters : 0,
          smallRooms: smallRooms ? smallRooms : 0,
          bigRooms: bigRooms ? bigRooms : 0,
          bathRooms: bathRooms ? bathRooms : 0,
          service: service ? service : [],
          smallCarpets: smallCarpets ? smallCarpets : 0,
          bigCarpets: bigCarpets ? bigCarpets : 0,
          startDate: startDate ? startDate : new Date(),
          expectedTime: expectedTime ? expectedTime : new Date(),
          cleaningDays: cleaningDays ? cleaningDays : [],
          regularity: regularity ? regularity : 0,
          recurrence: recurrence ? recurrence : 0,
          email: email ? email : "",
          price: 0,
          average: 0,
          phoneNumber: ""
        }}
        onSubmit={(values, { setFieldError }) => {
          try {
            if (company) {
              this.props.bookCleaning({
                ...values,
                company: this.props.company,
                customer: this.props.customer,
                city: this.props.city,
                phoneNumber: this.props.phoneNumber
                  ? this.props.phoneNumber
                  : values.phoneNumber
              });
            } else {
              this.props.lookOffers(values);
            }
          } catch (errors) {
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
