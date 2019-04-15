import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import BookingForm from "./BookingForm";
import validationSchema from "./BookingFormValidation";
import {
  lookOffers,
  bookCleaning,
  resetSelectedCompany
} from "../../actions/order.actions";

class Book extends Component {
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
          startDate: startDate ? startDate : Date.now(),
          expectedTime: expectedTime ? expectedTime : Date.now(),
          cleaningDays: cleaningDays ? cleaningDays : [],
          regularity: regularity ? regularity : 0,
          recurrence: recurrence ? recurrence : 0,
          email: email ? email : "",
          price: 0,
          average: 0
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setFieldError }) => {
          try {
            if (company) {
              this.props.bookCleaning({
                ...values,
                company: this.props.company,
                customer: this.props.customer,
                city: this.props.city
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

const mapStateToProps = state => ({
  city: state.order.city ? state.order.city : undefined,
  adress: state.order.adress ? state.order.adress : undefined,
  type: state.order.type ? state.order.type : undefined,
  squareMeters: state.order.squareMeters ? state.order.squareMeters : undefined,
  smallRooms: state.order.smallRooms ? state.order.smallRooms : undefined,
  bigRooms: state.order.bigRooms ? state.order.bigRooms : undefined,
  bathRooms: state.order.bathRooms ? state.order.bathRooms : undefined,
  service: state.order.service ? state.order.service : undefined,
  smallCarpets: state.order.smallCarpets ? state.order.smallCarpets : undefined,
  bigCarpets: state.order.bigCarpets ? state.order.bigCarpets : undefined,
  startDate: state.order.startDate ? state.order.startDate : undefined,
  expectedTime: state.order.expectedTime ? state.order.expectedTime : undefined,
  cleaningDays: state.order.cleaningDays ? state.order.cleaningDays : undefined,
  regularity: state.order.regularity ? state.order.regularity : undefined,
  recurrence: state.order.recurrence ? state.order.recurrence : undefined,
  email: state.profile.data.email
    ? state.profile.data.email
    : state.order.email
    ? state.order.email
    : undefined,
  company: state.order.company ? state.order.company : undefined,
  availableWorkingDays: state.order.company
    ? state.order.availableWorkingDays
    : undefined,
  customer: state.profile.data.id ? state.profile.data.id : undefined
});

export default connect(
  mapStateToProps,
  { lookOffers, bookCleaning, resetSelectedCompany }
)(Book);
