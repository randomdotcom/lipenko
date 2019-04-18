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

export const SIGNOUT = "SIGNOUT...";
export const signOut = () => ({
  type: SIGNOUT
});

export const SIGNOUT_SUCCESS = "SIGNOUT SUCCESS";
export const signOutSuccess = () => ({
  type: SIGNOUT_SUCCESS
});

export const LOAD_USER = "USER: LOAD...";
export const loadUser = () => ({
  type: LOAD_USER //////////////
});

export const USER_LOADED = "USER: LOADED";
export const userLoaded = data => ({
  type: USER_LOADED,
  payload: data /////////////////
});

export const EDIT_USER = "USER: EDIT...";
export const editUser = data => ({
  type: EDIT_USER,
  payload: data
});

export const USER_EDITED = "USER: EDITED SUCCESSFUL";
export const userEdited = data => ({
  type: USER_EDITED,
  payload: data
});

export const CHANGE_PASSWORD_USER = "USER: CHANGE PASWORD...";
export const changePasswordUser = data => ({
  type: CHANGE_PASSWORD_USER,
  payload: data
});

export const USER_PASSWORD_CHANGED = "USER: PASSWORD CHANGED";
export const userPasswordChanged = () => ({
  type: USER_PASSWORD_CHANGED
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

export const EXECUTOR_NEW_VERIFICATION_CODE =
  "EXECUTOR: NEW VERIFICATION CODE..";
export const executorNewVerificationCode = username => ({
  type: EXECUTOR_NEW_VERIFICATION_CODE,
  payload: { username }
});

export const EXECUTOR_NEW_VERIFICATION_CODE_SUCCESS =
  "EXECUTOR: NEW VERIFICATION CODE SUCCESS";
export const executorNewVerificationCodeSuccess = () => ({
  type: EXECUTOR_NEW_VERIFICATION_CODE_SUCCESS
});

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

export const LOAD_EXECUTOR = "EXECUTOR: LOAD...";
export const loadExecutor = () => ({
  type: LOAD_EXECUTOR
});

export const EXECUTOR_LOADED = "EXECUTOR: LOADED";
export const executorLoaded = data => ({
  type: EXECUTOR_LOADED,
  payload: data
});

export const EDIT_MAIN_INFO_EXECUTOR = "EXECUTOR: EDIT MAIN INFO...";
export const editMainExecutor = data => ({
  type: EDIT_MAIN_INFO_EXECUTOR,
  payload: data
});

export const EXECUTOR_MAIN_INFO_EDITED =
  "EXECUTOR: MAIN INFO EDITED SUCCESSFUL";
export const executorMainInfoEdited = data => ({
  type: EXECUTOR_MAIN_INFO_EDITED,
  payload: data
});

export const EDIT_TOC_EXECUTOR = "EXECUTOR: EDIT TOC...";
export const editTypesOfCleaningExecutor = data => ({
  type: EDIT_TOC_EXECUTOR,
  payload: data
});

export const EXECUTOR_TOC_EDITED = "EXECUTOR: TOC EDITED SUCCESSFUL";
export const executorTypesOfCleaningEdited = data => ({
  type: EXECUTOR_TOC_EDITED,
  payload: data
});

export const CHANGE_PASSWORD_EXECUTOR = "EXECUTOR: CHANGE PASWORD...";
export const changePasswordExecutor = data => ({
  type: CHANGE_PASSWORD_EXECUTOR,
  payload: data
});

export const EXECUTOR_PASSWORD_CHANGED = "EXECUTOR: PASSWORD CHANGED";
export const executorPasswordChanged = () => ({
  type: EXECUTOR_PASSWORD_CHANGED
});

export const ACCEPT_BOOK = "EXECUTOR: CONFIRM BOOK...";
export const acceptBook = data => ({
  type: ACCEPT_BOOK,
  payload: data
});

export const BOOK_ACCEPTED = "EXECUTOR: BOOK CONFIRMED";
export const bookAccepted = () => ({
  type: BOOK_ACCEPTED
});

export const CANCEL_BOOK = "EXECUTOR/USER: CANCEL BOOK...";
export const cancelBook = data => ({
  type: CANCEL_BOOK,
  payload: data
});

export const BOOK_CANCELED = "EXECUTOR/USER: BOOK CANCELED";
export const bookCanceled = () => ({
  type: BOOK_CANCELED
});

export const CONFIRM_BOOK = "USER: CONFIRM BOOK...";
export const confirmBook = data => ({
  type: CONFIRM_BOOK,
  payload: data
});

export const BOOK_CONFIRMED = "USER: BOOK CONFIRMED";
export const bookConfirmed = () => ({
  type: BOOK_CONFIRMED
});

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
