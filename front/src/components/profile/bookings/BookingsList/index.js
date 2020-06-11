import React from "react";
import BookingCard from "../../../../containers/profile/bookings/BookingCardContainer";

const BookingList = ({ bookings }) => {
  if (!bookings["0"]) {
    return <p>Заказы не найдены</p>;
  } else {
    console.log(bookings);
    return bookings.map(booking => (
      <BookingCard booking={booking} key={booking._id} />
    ));
  }
};

export default BookingList;
