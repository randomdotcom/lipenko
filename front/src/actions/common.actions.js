export const SIGNOUT = "SIGNOUT...";
export const signOut = () => ({
  type: SIGNOUT
});

export const SIGNOUT_SUCCESS = "SIGNOUT SUCCESS";
export const signOutSuccess = () => ({
  type: SIGNOUT_SUCCESS
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

export const LOAD_PROFILE = "PROFILE: LOAD...";
export const loadProfile = () => ({
  type: LOAD_PROFILE
});

export const PROFILE_LOADED = "PROFILE: LOADED";
export const profileLoaded = data => ({
  type: PROFILE_LOADED,
  payload: data
});
