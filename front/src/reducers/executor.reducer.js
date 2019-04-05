import { EXECUTOR_LOADED } from "../actions/executor/load.executor.actions";
import {
  EXECUTOR_SIGNIN_SUCCESS,
  EXECUTOR_SIGNIN_NEED_CONFIRM
} from "../actions/executor/signIn.executor.actions";
import { EXECUTOR_SIGNUP_SUCCESS } from "../actions/executor/signUp.executor.actions";
import { EXECUTOR_SIGNOUT_SUCCESS } from "../actions/executor/signOut.executor.actions";
import { EXECUTOR_CONFIRM_SUCCESS } from "../actions/executor/confirm.executor.actions";

export default (state = {}, action) => {
  switch (action.type) {
    case EXECUTOR_LOADED: {
      const user = action.payload;
      // user.orders.forEach(o => (o.date = new Date(o.date))); // преобр даты?

      return { ...state, ...user };
    }
    case EXECUTOR_SIGNIN_SUCCESS:
    case EXECUTOR_CONFIRM_SUCCESS: {
      console.log(action.payload);
      const user = action.payload;
      return {
        isAuthenticated: !!action.payload.token,
        id: user._id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        city: user.city,
        companyName: user.companyName,
        description: user.description,
        typesOfCleaning: user.typesOfCleaning,
        role: user.role
      };
    }
    // case USER_CONFIRM_FAILED: {
    //   const error = action.payload.data;
    //   return {
    //     error
    //   };
    // }
    case EXECUTOR_SIGNIN_NEED_CONFIRM:
    case EXECUTOR_SIGNUP_SUCCESS: {
      return {
        isSended: true
      };
    }
    case EXECUTOR_SIGNOUT_SUCCESS:
      return {
        isAuthenticated: false
      };

    default:
      return state;
  }
};
