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

export const EXECUTOR_SIGNIN_FAILED = "EXECUTOR: SIGNIN IS FAILED";
export const executorSignInFailed = err => ({
  type: EXECUTOR_SIGNIN_FAILED,
  payload: err
});