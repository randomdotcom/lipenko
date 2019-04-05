export const GET_ERRORS = "GET_ERRORS";
export const returnErrors = (message, id = null) => ({
  type: GET_ERRORS,
  payload: {
    message,
    id
  }
});

export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const clearErrors = () => ({
  type: CLEAR_ERRORS
});