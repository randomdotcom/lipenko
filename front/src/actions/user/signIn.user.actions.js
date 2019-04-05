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

export const USER_SIGNIN_FAILED = "USER: SIGNIN IS FAILED";
export const userSignInFailed = err => ({
  type: USER_SIGNIN_FAILED,
  payload: err
}); /////////////