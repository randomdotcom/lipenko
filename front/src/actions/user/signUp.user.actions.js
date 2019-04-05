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

export const USER_SIGNUP_FAILED = "USER: SIGNUP IS FAILED";
export const userSignUpFailed = err => ({
  type: USER_SIGNUP_FAILED,
  payload: err
}); ///////////