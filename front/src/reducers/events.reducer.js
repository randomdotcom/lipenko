import {
  GET_ERROR,
  CLEAR_ERROR,
  GET_EVENT,
  CLEAR_EVENT
} from "../actions/events.actions.js";

const initialState = {
  error: "",
  event: "",
  variant: ""
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ERROR: {
      const { message } = payload;
      return {
        error: message
      };
    }
    case CLEAR_ERROR:
      return {
        message: ""
      };
    case GET_EVENT: {
      const { message, variant } = payload;
      return {
        event: message,
        variant
      };
    }
    case CLEAR_EVENT:
      return {
        event: "",
        variant: ""
      };
    default:
      return state;
  }
}
