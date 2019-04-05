export const SIGNOUT_USER = "USER: SIGNOUT...";
export const signOutUser = () => ({
  type: SIGNOUT_USER
}); /////////////

export const USER_SIGNOUT_SUCCESS = "USER: SIGNOUT SUCCESS";
export const userSignOutSuccess = () => ({
  type: USER_SIGNOUT_SUCCESS
}); ///////////////

export const USER_SIGNOUT_FAILED = "USER: SIGNOUT FAILED";
export const userSignOutFailed = err => ({
  type: USER_SIGNOUT_FAILED,
  payload: err
}); ////////////