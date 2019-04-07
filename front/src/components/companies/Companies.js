import React, {Component} from "react";
import { connect } from 'react-redux'
import { loadCompanies } from '../../actions/companies.actions'

class Companies extends Component {

  componentWillMount() {
    this.props.loadCompanies();
  }

  // return (
    
  // );
}

const mapStateToProps = state => ({
  companies: state.companies
});

export default connect(null, { loadCompanies })(Companies);
