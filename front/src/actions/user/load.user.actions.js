export const LOAD_USER = "USER: LOAD...";
export const loadUser = () => ({
  type: LOAD_USER ///////////////
});

export const USER_LOADED = "USER: LOADED";
export const userLoaded = data => ({
  type: USER_LOADED,
  payload: data /////////////////
});

export const USER_LOAD_FAILED = "USER: LOAD IS FAILED";
export const userLoadFail = err => ({
  type: USER_LOAD_FAILED,
  payload: err
}); ////////// ???????????????