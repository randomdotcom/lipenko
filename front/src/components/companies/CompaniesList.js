import React from "react";
import { connect } from "react-redux";
import CompanyCard from "./CompanyCard";

function CompaniesList(props) {
  console.log(props);
  return props.companies.map(company => <CompanyCard company={company} />);
}

const mapStateToProps = state => ({
  companies: state.companies.docs
});

export default connect(mapStateToProps)(CompaniesList);
