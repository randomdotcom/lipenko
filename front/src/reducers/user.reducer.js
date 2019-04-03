import {
  USER_LOADED,
  USER_SIGNIN_SUCCESS,
  USER_CONFIRM_SUCCESS,
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
    case USER_CONFIRM_SUCCESS: {
      const { user } = action.payload;
      return {
        isAuthenticated: !!action.payload.token,
        id: user._id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role
      };
    }
    case USER_SIGNUP_SUCCESS: {
      return {
        isSended: true
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
