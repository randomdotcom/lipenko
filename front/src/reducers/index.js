import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import profile from "./profile.reducer";
import errors from "./errors.reducer";
import companies from './companies.reducer'
import company from './company.reducer'
import order from './order.reducer'

export default history =>
  combineReducers({
    router: connectRouter(history),
    profile,
    companies,
    company,
    order,
    errors
  });
