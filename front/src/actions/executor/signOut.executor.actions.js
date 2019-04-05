export const SIGNOUT_EXECUTOR = "EXECUTOR: SIGNOUT...";
export const signOutExecutor = () => ({
  type: SIGNOUT_EXECUTOR
});

export const EXECUTOR_SIGNOUT_SUCCESS = "EXECUTOR: SIGNOUT SUCCESS";
export const executorSignOutSuccess = () => ({
  type: EXECUTOR_SIGNOUT_SUCCESS
});

export const EXECUTOR_SIGNOUT_FAILED = "EXECUTOR: SIGNOUT FAILED";
export const executorSignOutFailed = err => ({
  type: EXECUTOR_SIGNOUT_FAILED,
  payload: err
});