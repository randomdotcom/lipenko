import { COMPANIES_LOADED } from "../actions/companies.actions";

const initialState = {

}

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANIES_LOADED: {
      const companies = action.payload;

      return { ...companies };
    }
    default:
      return state;
  }
};
