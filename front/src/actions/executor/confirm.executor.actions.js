export const CONFIRM_EXECUTOR = "EXECUTOR: CONFIRMATION..";
export const confirmExecutor = token => {
  return {
    type: CONFIRM_EXECUTOR,
    payload: { token }
  };
};

export const EXECUTOR_CONFIRM_SUCCESS = "EXECUTOR: CONFIRMATION IS SUCCESS";
export const executorConfirmSuccess = data => ({
  type: EXECUTOR_CONFIRM_SUCCESS,
  payload: data
});

export const EXECUTOR_CONFIRM_FAILED = "EXECUTOR: CONFIRMATION IS FAILED";
export const executorConfirmFailed = err => ({
  type: EXECUTOR_CONFIRM_FAILED,
  payload: err
});
