import React from "react";
import CustomerCard from "./CustomerCard";

const CustomersList = ({ customers }) => {
  if (!customers['0']) {
    return <p>Customers are not found</p>;
  } else {
    return customers.map(customer => (
      <CustomerCard customer={customer} id={customer._id} key={customer._id} />
    ));
  }
};

export default CustomersList;