import React from "react";
import CompanyCard from "./CompanyCard";

const CompaniesList = ({ companies }) => {
  if (companies[0] === undefined) {
    return <p>Loading</p>;
  } else {
    return companies.map(company => (
      <CompanyCard company={company} key={company._id} />
    ));
  }
};

export default CompaniesList;
