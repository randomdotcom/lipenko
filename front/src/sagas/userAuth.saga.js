import axios from "axios";
import { call, put, take, takeLeading, takeEvery, throttle } from "redux-saga/effects";
import { storeToken, clearToken } from "../authentication";
import {
  SIGNIN_USER,
  userSignInSuccess,
  userSignInNeedConfirm,
  SIGNUP_USER,
  userSignUpSuccess,
  SIGNOUT_USER,
  userSignOutSuccess,
  CONFIRM_USER,
  userConfirmSuccess,
  USER_NEW_VERIFICATION_CODE,
  userNewVerificationCodeSuccess
} from "../actions/auth.actions";
import { returnErrors } from "../actions/errors.actions";

export function* watchUserSignUpSaga() {
  yield takeLeading(SIGNUP_USER, function* ({ payload }) {
    try {
      yield call(axios.post, "/api/clients/register", payload);
      yield put(userSignUpSuccess(payload.username));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchUserConfirmSaga() {
  yield takeLeading(CONFIRM_USER, function* ({ payload }) {
    try {
      const response = yield call(axios.put, "/api/clients/confirm", payload);

      yield put(userConfirmSuccess(response.data));
      yield call(storeToken, response.data.token, response.data.user);
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchUserNewVerificationCode() {
  yield throttle(120000, USER_NEW_VERIFICATION_CODE, function* ({ payload }) {
    try {
      yield call(axios.put, "/api/clients/newVerificationCode", payload);
      yield put(userNewVerificationCodeSuccess());
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchUserSignInSaga() {
  yield takeLeading(SIGNIN_USER, function* ({ payload }) {
    try {
      const response = yield call(axios.post, "/api/clients/signin", payload);

      if (!response.data.isVerified) {
        yield put(userSignInNeedConfirm(payload.username));
        yield take(CONFIRM_USER);
      } else {
        yield put(userSignInSuccess(response.data));
        yield call(storeToken, response.data.token, response.data.user);
        yield take(SIGNOUT_USER);
      }
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
    // yield put(push("/")); // Редирект
  });
}

export function* watchUserSignOutSaga() {
  yield takeEvery(SIGNOUT_USER, function* () {
    try {
      yield call(clearToken);
      yield put(userSignOutSuccess());
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}
