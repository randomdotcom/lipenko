export const LOAD_EXECUTOR = "EXECUTOR: LOAD...";
export const loadExecutor = () => ({
  type: LOAD_EXECUTOR
});

export const EXECUTOR_LOADED = "EXECUTOR: LOADED";
export const executorLoaded = data => ({
  type: EXECUTOR_LOADED,
  payload: data
});

export const EXECUTOR_LOAD_FAILED = "EXECUTOR: LOAD IS FAILED";
export const executorLoadFail = err => ({
  type: EXECUTOR_LOAD_FAILED,
  payload: err
}); //// ??????????????????????
