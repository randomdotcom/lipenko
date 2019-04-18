import { COMPANY_LOADED } from "../actions/companies.actions";
import { COMPANY_BLOCKED, COMPANY_UNBLOCKED } from "../actions/admin.actions";

export default (state = {}, action) => {
  switch (action.type) {
    case COMPANY_LOADED: {
      const company = action.payload;

      return { ...company };
    }
    case COMPANY_BLOCKED: {
      const { reason } = action.payload;
      return {  ...state, isBlocked: true, blockReason: reason };
    }
    case COMPANY_UNBLOCKED: {
      return {  ...state, isBlocked: false, blockReason: undefined };
    }
    default:
      return state;
  }
};
