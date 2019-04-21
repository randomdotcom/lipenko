export const SIGNUP_EXECUTOR = "EXECUTOR: SIGNUP..";
export const signUpExecutor = data => ({
  type: SIGNUP_EXECUTOR,
  payload: data
});

export const EXECUTOR_SIGNUP_SUCCESS = "EXECUTOR: SIGNUP SUCCESS";
export const executorSignUpSuccess = () => ({
  type: EXECUTOR_SIGNUP_SUCCESS
});

export const EXECUTOR_SIGNUP_FAILED = "EXECUTOR: SIGNUP IS FAILED";
export const executorSignUpFailed = err => ({
  type: EXECUTOR_SIGNUP_FAILED,
  payload: err
});

export const CONFIRM_EXECUTOR = "EXECUTOR: CONFIRMATION..";
export const confirmExecutor = token => {
  return {
    type: CONFIRM_EXECUTOR,
    payload: { token }
  };
};

export const EXECUTOR_NEW_VERIFICATION_CODE =
  "EXECUTOR: NEW VERIFICATION CODE..";
export const executorNewVerificationCode = username => ({
  type: EXECUTOR_NEW_VERIFICATION_CODE,
  payload: { username }
});

export const EXECUTOR_NEW_VERIFICATION_CODE_SUCCESS =
  "EXECUTOR: NEW VERIFICATION CODE SUCCESS";
export const executorNewVerificationCodeSuccess = () => ({
  type: EXECUTOR_NEW_VERIFICATION_CODE_SUCCESS
});

export const EXECUTOR_CONFIRM_SUCCESS = "EXECUTOR: CONFIRMATION IS SUCCESS";
export const executorConfirmSuccess = data => ({
  type: EXECUTOR_CONFIRM_SUCCESS,
  payload: data
});

export const SIGNIN_EXECUTOR = "EXECUTOR: SIGNIN..";
export const signInExecutor = (username, password) => ({
  type: SIGNIN_EXECUTOR,
  payload: { username, password }
});

export const EXECUTOR_SIGNIN_SUCCESS = "EXECUTOR: SIGNIN SUCCESS";
export const executorSignInSuccess = data => ({
  type: EXECUTOR_SIGNIN_SUCCESS,
  payload: data
});

export const EXECUTOR_SIGNIN_NEED_CONFIRM = "EXECUTOR: NEED CONFIRM FOR SIGNIN";
export const executorSignInNeedConfirm = username => ({
  type: EXECUTOR_SIGNIN_NEED_CONFIRM,
  payload: { username }
});