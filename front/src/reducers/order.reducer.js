import { COMPANY_CHOSEN, OFFERS_FOUND, CLEANING_BOOKED } from "../actions/order.actions";

export default (state = {}, action) => {
  switch (action.type) {
    case COMPANY_CHOSEN: {
      const company = action.payload;

      return { ...state, company };
    }
    case OFFERS_FOUND: {
      const orderData = action.payload;

      return { ...orderData };
    }
    case CLEANING_BOOKED: {
      return {}
    }
    default:
      return state;
  }
};
