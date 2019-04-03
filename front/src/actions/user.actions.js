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
export const signUpUser = (data) => ({
  type: SIGNUP_USER,
  payload: data
});

export const USER_SIGNUP_SUCCESS = "USER: SIGNUP SUCCESS";
export const userSignUpSuccess = data => ({
  type: USER_SIGNUP_SUCCESS,
  payload: data
});

export const USER_SIGNUP_FAILED = "USER: SIGNUP IS FAILED";
export const userSignUpFailed = err => ({
  type: USER_SIGNUP_FAILED,
  payload: err
});