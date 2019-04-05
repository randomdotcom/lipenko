import { combineReducers } from "redux";
import profile from "./profile.reducer";
import errors from "./errors.reducer";

const combinedReducers = combineReducers({
  profile,
  errors
});

export default combinedReducers;
