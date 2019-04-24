import {
  REVIEWS_LOADED,
  REVIEWS_MORE_LOADED,
  REVIEWS_RESET
} from "../actions/reviews.actions";

const initialState = {
  docs: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REVIEWS_LOADED: {
      return {
        ...action.payload
      };
    }
    case REVIEWS_MORE_LOADED: {
      return {
        ...state,
        ...action.payload,
        docs: [...state.docs, ...action.payload.docs]
      };
    }
    case REVIEWS_RESET: {
      return {};
    }
    default:
      return state;
  }
};
