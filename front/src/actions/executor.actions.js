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

export const UPLOAD_LOGO = "EXECUTOR: UPLOAD LOGO..";
export const uploadLogo = data => ({
  type: UPLOAD_LOGO,
  payload: data
});

export const LOGO_UPLOADED = "EXECUTOR: LOGO UPLOADED";
export const logoUploaded = data => ({
  type: LOGO_UPLOADED,
  payload: data
});
