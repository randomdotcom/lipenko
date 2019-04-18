import {
  CUSTOMERS_LOADED
} from "../actions/admin.actions";

const initialState = {
  customers: {
    docs: {}
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMERS_LOADED: {
      const customers = action.payload;

      return { ...state, customers: { ...customers } };
    }
    default:
      return state;
  }
};
