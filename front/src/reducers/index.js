import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import profile from "./profile.reducer";
import errors from "./errors.reducer";
import companies from './companies.reducer'

export default history =>
  combineReducers({
    router: connectRouter(history),
    profile,
    companies,
    errors
  });
