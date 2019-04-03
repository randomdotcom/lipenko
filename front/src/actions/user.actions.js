export const LOAD_USER = "USER: LOAD...";
export const loadUser = () => ({
  type: LOAD_USER
});

export const USER_LOADED = "USER: LOADED";
export const userLoaded = data => ({
  type: USER_LOADED,
  payload: data
});

export const USER_LOAD_FAILED = "USER: LOAD IS FAILED";
export const userLoadFail = err => ({
  type: USER_LOAD_FAILED,
  payload: err
});

export const SIGNIN_USER = "USER: SIGNIN..";
export const signInUser = (username, password) => ({
  type: SIGNIN_USER,
  payload: { username, password }
});

export const USER_SIGNIN_SUCCESS = "USER: SIGNIN SUCCESS";
export const userSignInSuccess = (token, user) => ({
  type: USER_SIGNIN_SUCCESS,
  payload: { token, user }
});

export const USER_SIGNIN_NEED_CONFIRM = "USER: NEED CONFIRM FOR SIGNIN";
export const userSignInNeedConfirm = (token, user) => ({
  type: USER_SIGNIN_NEED_CONFIRM,
  payload: { token, user }
});

export const USER_SIGNIN_FAILED = "USER: SIGNIN IS FAILED";
export const userSignInFailed = err => ({
  type: USER_SIGNIN_FAILED,
  payload: err
});

export const SIGNOUT_USER = "USER: SIGNOUT...";
export const signOutUser = () => ({
  type: SIGNOUT_USER
});

export const USER_SIGNOUT_SUCCESS = "USER: SIGNOUT SUCCESS";
export const userSignOutSuccess = () => ({
  type: USER_SIGNOUT_SUCCESS
});

export const USER_SIGNOUT_FAILED = "USER: SIGNOUT FAILED";
export const userSignOutFailed = err => ({
  type: USER_SIGNOUT_FAILED,
  payload: err
});

export const SIGNUP_USER = "USER: SIGNUP..";
export const signUpUser = data => ({
  type: SIGNUP_USER,
  payload: data
});

export const USER_SIGNUP_SUCCESS = "USER: SIGNUP SUCCESS";
export const userSignUpSuccess = () => ({
  type: USER_SIGNUP_SUCCESS
});

export const USER_SIGNUP_FAILED = "USER: SIGNUP IS FAILED";
export const userSignUpFailed = err => ({
  type: USER_SIGNUP_FAILED,
  payload: err
});

export const CONFIRM_USER = "USER: CONFIRMATION..";
export const confirmUser = verificationCode => {
  return {
    type: CONFIRM_USER,
    payload: verificationCode
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
});
