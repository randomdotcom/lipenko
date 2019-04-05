import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_NEED_CONFIRM,
  USER_SIGNUP_SUCCESS,
  USER_SIGNOUT_SUCCESS,
  USER_CONFIRM_SUCCESS,
  EXECUTOR_SIGNIN_SUCCESS,
  EXECUTOR_SIGNIN_NEED_CONFIRM,
  EXECUTOR_SIGNUP_SUCCESS,
  EXECUTOR_SIGNOUT_SUCCESS,
  EXECUTOR_CONFIRM_SUCCESS
} from "../actions/auth.actions";

const initialState = {
  data: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    // case USER_LOADED: {
    //   const user = action.payload;
    //   // user.orders.forEach(o => (o.date = new Date(o.date))); // преобр даты?

    //   return { ...state, ...user };
    // }
    case USER_SIGNIN_SUCCESS:
    case USER_CONFIRM_SUCCESS: {
      const user = action.payload;
      return {
        isAuthenticated: !!action.payload.token,
        role: user.role,
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          adress: user.adress
        }
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
        data: { username: action.payload.username }
      };
    }
    case USER_SIGNOUT_SUCCESS: {
      return {
        isAuthenticated: false
      };
    }
    // case EXECUTOR_LOADED: {
    //   const user = action.payload;
    //   // user.orders.forEach(o => (o.date = new Date(o.date))); // преобр даты?

    //   return { ...state, ...user };
    // }
    case EXECUTOR_SIGNIN_SUCCESS:
    case EXECUTOR_CONFIRM_SUCCESS: {
      const user = action.payload;
      return {
        isAuthenticated: !!action.payload.token,
        role: user.role,
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          city: user.city,
          companyName: user.companyName,
          description: user.description,
          typesOfCleaning: user.typesOfCleaning
        }
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
