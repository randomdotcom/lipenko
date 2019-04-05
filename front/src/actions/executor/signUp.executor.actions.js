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