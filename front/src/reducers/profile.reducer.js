import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_NEED_CONFIRM,
  USER_SIGNUP_SUCCESS,
  SIGNOUT_SUCCESS,
  USER_CONFIRM_SUCCESS,
  USER_EDITED,
  EXECUTOR_SIGNIN_SUCCESS,
  EXECUTOR_SIGNIN_NEED_CONFIRM,
  EXECUTOR_SIGNUP_SUCCESS,
  EXECUTOR_CONFIRM_SUCCESS,
  EXECUTOR_TOC_EDITED,
  EXECUTOR_MAIN_INFO_EDITED,
  ADMIN_SIGNIN_SUCCESS
} from "../actions/auth.actions";
import { BOOKINGS_LOADED } from "../actions/bookings.actions";

const initialState = {
  isAuthenticated: false,
  isSended: false,
  role: "",
  data: {},
  bookings: {
    docs: {}
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case USER_LOADED: {
    //   const user = action.payload;
    //   // user.orders.forEach(o => (o.date = new Date(o.date))); // преобр даты?

    //   return { ...state, ...user };
    // }
    case ADMIN_SIGNIN_SUCCESS: {
      const user = action.payload.user;
      return {
        ...state,
        isAuthenticated: !!action.payload.token,
        role: user.role,
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber
        }
      };
    }
    case USER_SIGNIN_SUCCESS:
    case USER_CONFIRM_SUCCESS: {
      const user = action.payload.user;
      return {
        ...state,
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
    case USER_SIGNIN_NEED_CONFIRM:
    case USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        isSended: true,
        data: { username: action.payload.username }
      };
    }
    case SIGNOUT_SUCCESS: {
      return {
        isAuthenticated: false
      };
    }
    case USER_EDITED: {
      return {
        ...state,
        data: {
          username: action.payload.username,
          email: action.payload.email,
          phoneNumber: action.payload.phoneNumber,
          adress: action.payload.adress
        }
      };
    }
    // case EXECUTOR_LOADED: {
    //   const user = action.payload;
    //   // user.orders.forEach(o => (o.date = new Date(o.date))); // преобр даты?

    //   return { ...state, ...user };
    // }
    case EXECUTOR_SIGNIN_SUCCESS:
    case EXECUTOR_CONFIRM_SUCCESS: {
      const user = action.payload.user;
      return {
        ...state,
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
    case EXECUTOR_SIGNIN_NEED_CONFIRM:
    case EXECUTOR_SIGNUP_SUCCESS: {
      return {
        ...state
      };
    }
    case EXECUTOR_MAIN_INFO_EDITED: {
      return {
        ...state,
        data: {
          username: action.payload.username,
          email: action.payload.email,
          phoneNumber: action.payload.phoneNumber,
          city: action.payload.city,
          companyName: action.payload.companyName,
          description: action.payload.description,
          typesOfCleaning: state.data.typesOfCleaning
        }
      };
    }
    case EXECUTOR_TOC_EDITED: {
      console.log(action.payload);
      return {
        ...state,
        data: {
          username: state.data.username,
          email: state.data.email,
          phoneNumber: state.data.phoneNumber,
          city: state.data.city,
          companyName: state.data.companyName,
          description: state.data.description,
          typesOfCleaning: action.payload
        }
      };
    }
    case BOOKINGS_LOADED: {
      const bookings = action.payload;

      return { ...state, bookings: { ...bookings } };
    }
    default:
      return state;
  }
};
