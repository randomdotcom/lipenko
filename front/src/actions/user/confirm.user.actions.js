export const CONFIRM_USER = "USER: CONFIRMATION..";
export const confirmUser = data => {
  return {
    type: CONFIRM_USER,
    payload: data
  };
};

export const USER_CONFIRM_SUCCESS = "USER: CONFIRMATION IS SUCCESS";
export const userConfirmSuccess = data => ({
  type: USER_CONFIRM_SUCCESS,
  payload: data
});

export const USER_CONFIRM_FAILED = "USER: CONFIRMATION IS FAILED";
export const userConfirmFailed = err => ({
  type: USER_CONFIRM_FAILED,
  payload: err
}); /////////////