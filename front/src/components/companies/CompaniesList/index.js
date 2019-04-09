import React from "react";
import CompanyCard from "./CompanyCard";

const CompaniesList = ({ companies }) => {
  if (companies[0] === undefined) {
    return <p>Companies is not found</p>;
  } else {
    return companies.map(company => (
      <CompanyCard company={company} key={company._id} />
    ));
  }
};

export default CompaniesList;
