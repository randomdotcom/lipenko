import { GET_ERRORS, CLEAR_ERRORS } from "../actions/errors.actions.js";

const initialState = {
  message: "",
  id: null
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ERRORS: {
      const { message } = payload;
      return {
        message
      };
    }
    case CLEAR_ERRORS:
      return {
        message: "",
        id: null
      };
    default:
      return state;
  }
}
