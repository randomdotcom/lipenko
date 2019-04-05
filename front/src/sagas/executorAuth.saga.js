import axios from "axios";
import { call, put, take, takeLeading, takeEvery } from "redux-saga/effects";
import { storeToken, clearToken } from "../authentication";
import {
  SIGNIN_EXECUTOR,
  executorSignInSuccess,
  executorSignInNeedConfirm,
  SIGNUP_EXECUTOR,
  executorSignUpSuccess,
  SIGNOUT_EXECUTOR,
  executorSignOutSuccess,
  CONFIRM_EXECUTOR,
  executorConfirmSuccess
} from "../actions/auth.actions";
import { returnErrors } from "../actions/errors.actions";

export function* watchExecutorSignUpSaga() {
  yield takeLeading(SIGNUP_EXECUTOR, function*({ payload }) {
    try {
      yield call(axios.post, "/api/companies/register", payload);
      yield put(executorSignUpSuccess());
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }

    //yield call(storeToken, response.data.token, response.data.user);
    // yield put(push("/")); // Редирект
  });
}

export function* watchExecutorConfirmSaga() {
  yield takeLeading(CONFIRM_EXECUTOR, function*({ payload }) {
    try {
      const response = yield call(axios.put, "/api/companies/confirm", payload);

      yield put(executorConfirmSuccess(response.data));
      yield call(storeToken, response.data.token, response.data.user);
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchExecutorSignInSaga() {
  yield takeLeading(SIGNIN_EXECUTOR, function*({ payload }) {
    try {
      const response = yield call(axios.post, "/api/companies/signin", payload);

      if (!response.data.isVerified) {
        yield put(executorSignInNeedConfirm());
        yield take(CONFIRM_EXECUTOR);
      } else {
        yield put(executorSignInSuccess(response.data));
        yield call(storeToken, response.data.token, response.data.user);
        yield take(SIGNOUT_EXECUTOR);
      }
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
    // yield put(push("/")); // Редирект
  });
}

export function* watchExecutorSignOutSaga() {
  yield takeEvery(SIGNOUT_EXECUTOR, function*() {
    try {
      yield call(clearToken);
      yield put(executorSignOutSuccess());
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}
