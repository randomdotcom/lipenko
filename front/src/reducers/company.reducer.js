import { COMPANY_LOADED } from "../actions/companies.actions";

export default (state = {}, action) => {
  switch (action.type) {
    case COMPANY_LOADED: {
      const company = action.payload;

      return { ...company };
    }
    default:
      return state;
  }
};
