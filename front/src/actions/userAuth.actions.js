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
export const confirmUser = data => ({
  type: CONFIRM_USER,
  payload: data
});

export const USER_NEW_VERIFICATION_CODE = "USER: NEW VERIFICATION CODE..";
export const userNewVerificationCode = username => ({
  type: USER_NEW_VERIFICATION_CODE,
  payload: { username }
});

export const USER_NEW_VERIFICATION_CODE_SUCCESS =
  "USER: NEW VERIFICATION CODE SUCCESS";
export const userNewVerificationCodeSuccess = () => ({
  type: USER_NEW_VERIFICATION_CODE_SUCCESS
});

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

export const AUTH_SOCIAL = "USER: SOCIAL AUTH..";
export const authSocial = data => ({
  type: AUTH_SOCIAL,
  payload: data
})