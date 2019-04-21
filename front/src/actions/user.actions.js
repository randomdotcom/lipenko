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

export const CONFIRM_BOOK = "USER: CONFIRM BOOK...";
export const confirmBook = data => ({
  type: CONFIRM_BOOK,
  payload: data
});

export const BOOK_CONFIRMED = "USER: BOOK CONFIRMED";
export const bookConfirmed = () => ({
  type: BOOK_CONFIRMED
});