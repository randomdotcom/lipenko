import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import executorReducer from "./executor.reducer";

console.log(userReducer);

const user = combineReducers(userReducer, executorReducer); //// ?

const combinedReducers = combineReducers({
  user
});

export default combinedReducers;
