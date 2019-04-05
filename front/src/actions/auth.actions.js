export const SIGNUP_USER = "USER: SIGNUP..";
export const signUpUser = data => ({
  type: SIGNUP_USER,
  payload: data
});

export const USER_SIGNUP_SUCCESS = "USER: SIGNUP SUCCESS";
export const userSignUpSuccess = username => ({
  type: USER_SIGNUP_SUCCESS,
  payload: { username }
});

export const CONFIRM_USER = "USER: CONFIRMATION..";
export const confirmUser = data => {
  return {
    type: CONFIRM_USER,
    payload: data
  };
};

export const USER_NEW_VERIFICATION_CODE = "USER: NEW VERIFICATION CODE..";
export const userNewVerificationCode = username => {
  return {
    type: USER_NEW_VERIFICATION_CODE,
    payload: { username }
  };
};

export const USER_NEW_VERIFICATION_CODE_SUCCESS = "USER: NEW VERIFICATION CODE SUCCESS";
export const userNewVerificationCodeSuccess = () => {
  return {
    type: USER_NEW_VERIFICATION_CODE_SUCCESS
  };
};

export const USER_CONFIRM_SUCCESS = "USER: CONFIRMATION IS SUCCESS";
export const userConfirmSuccess = data => ({
  type: USER_CONFIRM_SUCCESS,
  payload: data
});

export const SIGNIN_USER = "USER: SIGNIN..";
export const signInUser = (username, password) => ({
  type: SIGNIN_USER,
  payload: { username, password }
});

export const USER_SIGNIN_SUCCESS = "USER: SIGNIN SUCCESS";
export const userSignInSuccess = data => ({
  type: USER_SIGNIN_SUCCESS,
  payload: data
});

export const USER_SIGNIN_NEED_CONFIRM = "USER: NEED CONFIRM FOR SIGNIN";
export const userSignInNeedConfirm = username => ({
  type: USER_SIGNIN_NEED_CONFIRM,
  payload: { username }
});

export const SIGNOUT_USER = "USER: SIGNOUT...";
export const signOutUser = () => ({
  type: SIGNOUT_USER
}); /////////////

export const USER_SIGNOUT_SUCCESS = "USER: SIGNOUT SUCCESS";
export const userSignOutSuccess = () => ({
  type: USER_SIGNOUT_SUCCESS
}); ///////////////

export const LOAD_USER = "USER: LOAD...";
export const loadUser = () => ({
  type: LOAD_USER ///////////////
});

export const USER_LOADED = "USER: LOADED";
export const userLoaded = data => ({
  type: USER_LOADED,
  payload: data /////////////////
});

//////////////////////// EEEXXXEEECCCUUUTTTOOORRRR ///////////////////

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
