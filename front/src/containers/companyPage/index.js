import { connect } from "react-redux";
import { loadCompany } from "../../actions/companies.actions";
import { chooseCompany } from "../../actions/order.actions";
import { blockCompany, unblockCompany } from "../../actions/admin.actions";
import { reviewCompany } from "../../actions/reviews.actions";
import CompanyPage from "../../components/companyPage";

const mapStateToProps = state => ({
  role: state.profile.role,
  company: state.company,
  toc: state.company.typesOfCleaning
});

export default connect(
  mapStateToProps,
  { loadCompany, chooseCompany, blockCompany, unblockCompany, reviewCompany }
)(CompanyPage);
