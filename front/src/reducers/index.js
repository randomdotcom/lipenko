import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import profile from "./profile.reducer";
import events from "./events.reducer";
import companies from "./companies.reducer";
import company from "./company.reducer";
import order from "./order.reducer";
import admin from "./admin.reducer";
import reviews from "./reviews.reducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    profile,
    companies,
    company,
    reviews,
    order,
    admin,
    events
  });
