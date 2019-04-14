import { COMPANY_CHOSEN } from "../actions/order.actions";

export default (state = {}, action) => {
  switch (action.type) {
    case COMPANY_CHOSEN: {
      const company = action.payload;

      return { company };
    }
    default:
      return state;
  }
};
