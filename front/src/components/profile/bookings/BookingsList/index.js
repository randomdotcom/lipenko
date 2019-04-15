import React from "react";
import BookingCard from "./BookingCard";

const BookingList = ({ bookings }) => {
  if (!bookings["0"]) {
    return <p>Bookings is not found</p>;
  } else {
    return bookings.map(booking => (
      <BookingCard booking={booking} key={booking._id} />
    ));
  }
};

export default BookingList;
