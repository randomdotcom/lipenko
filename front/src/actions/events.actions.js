export const GET_ERROR = "GET_ERROR";
export const returnError = message => ({
  type: GET_ERROR,
  payload: {
    message
  }
});

export const CLEAR_ERROR = "CLEAR_ERROR";
export const clearError = () => ({
  type: CLEAR_ERROR
});

export const GET_EVENT = "GET_EVENT";
export const returnEvent = (message, variant) => ({
  type: GET_EVENT,
  payload: {
    message,
    variant
  }
});

export const CLEAR_EVENT = "CLEAR_EVENT";
export const clearEvent = () => ({
  type: CLEAR_EVENT
});
