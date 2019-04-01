import { SIGN_IN_USER, SIGN_IN_EXECUTOR } from "../actions/userActions";

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case SIGN_IN_USER:
      return Object.assign({}, state, {
        username: action.username,
        email: action.email,
        phoneNumber: action.phoneNumber,
        adress: action.adress,
        role: action.role
      });
    case SIGN_IN_EXECUTOR:
      return Object.assign({}, state, {
        username: action.username,
        email: action.email,
        phoneNumber: action.phoneNumber,
        city: action.city,
        companyName: action.companyName,
        description: action.description,
        typesOfCleaning: action.typesOfCleaning,
        role: action.role
      });
    default:
      return state;
  }
}
