import React from "react";
import CompanyCard from "./CompanyCard";

const CompaniesList = ({ companies }) => {
  if (!companies['0']) {
    return <p>Компании не найдены</p>;
  } else {
    return companies.map(company => (
      <CompanyCard company={company} id={company._id} key={company._id} />
    ));
  }
};

export default CompaniesList;