export const SIGNIN_ADMIN = "ADMIN: SIGN IN..";
export const signInAdmin = data => ({
  type: SIGNIN_ADMIN,
  payload: data
});

export const ADMIN_SIGNIN_SUCCESS = "ADMIN: SIGN IN SUCCESS";
export const adminSignInSuccess = data => ({
  type: ADMIN_SIGNIN_SUCCESS,
  payload: data
});