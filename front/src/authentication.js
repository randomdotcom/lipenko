import {
  userSignInSuccess,
  executorSignInSuccess,
  adminSignInSuccess,
  loadProfile
} from "./actions/auth.actions";

const AUTH_TOKEN_KEY = "auth token";
const USER_KEY = "user";

export const initializePreviousToken = store => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const user = JSON.parse(localStorage.getItem(USER_KEY));
  if (user) {
    if (user.role === "user") {
      if (token) store.dispatch(userSignInSuccess({ token, user }));
    } else if (user.role === "executor") {
      if (token) store.dispatch(executorSignInSuccess({ token, user }));
    } else if (user.role === "admin") {
      if (token) store.dispatch(adminSignInSuccess({ token, user }));
    }
    store.dispatch(loadProfile());
  }
};

export const storeToken = data => {
  const { token, ...user } = data;
  
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
