import {
  USER_LOADED,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_SUCCESS,
  USER_SIGNOUT_SUCCESS
} from "../actions/user.actions";

export default (state = {}, action) => {
  switch (action.type) {
    case USER_LOADED: {
      const user = action.payload;
      // user.orders.forEach(o => (o.date = new Date(o.date))); // преобр даты?

      return { ...state, ...user };
    }
    case USER_SIGNIN_SUCCESS: {
      const user = action.payload.user;
      user.orders = user.orders || [];

      return {
        isAuthenticated: !!action.payload.token,
        ...action.payload.user
      };
    }
    case USER_SIGNUP_SUCCESS: {
      const user = action.payload.username;
      // user.orders = user.orders || [];

      return {
        // isAuthenticated: !!action.payload.token,
        ...action.payload.username
      };
    }
    case USER_SIGNOUT_SUCCESS:
      return {
        isAuthenticated: false
      };

    default:
      return state;
  }
};