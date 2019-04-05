import { USER_LOADED } from "../actions/user/load.user.actions";
import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_NEED_CONFIRM
} from "../actions/user/signIn.user.actions";
import { USER_SIGNUP_SUCCESS } from "../actions/user/signUp.user.actions";
import { USER_SIGNOUT_SUCCESS } from "../actions/user/signOut.user.actions";
import { USER_CONFIRM_SUCCESS } from "../actions/user/confirm.user.actions";

export default (state = {}, action) => {
  console.log(action)
  switch (action.type) {
    case USER_LOADED: {
      const user = action.payload;
      // user.orders.forEach(o => (o.date = new Date(o.date))); // преобр даты?

      return { ...state, ...user };
    }
    case USER_SIGNIN_SUCCESS:
    case USER_CONFIRM_SUCCESS: {
      const user = action.payload;
      console.log(action.payload)
      return {
        isAuthenticated: !!action.payload.token,
        id: user._id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        adress: user.adress,
        role: user.role
      };
    }
    // case USER_CONFIRM_FAILED: {
    //   const error = action.payload.data;
    //   return {
    //     error
    //   };
    // }
    case USER_SIGNIN_NEED_CONFIRM:
    case USER_SIGNUP_SUCCESS: {
      return {
        isSended: true,
        username: action.payload.username
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
