import {
  call,
  put,
  take,
  takeLeading,
  takeEvery,
  debounce
} from "redux-saga/effects";
import {
  SIGNIN_EXECUTOR,
  executorSignInSuccess,
  executorSignInNeedConfirm
} from "../actions/executor/signIn.executor.actions";
import {
  SIGNUP_EXECUTOR,
  executorSignUpSuccess,
  executorSignUpFailed
} from "../actions/executor/signUp.executor.actions";
import {
  SIGNOUT_EXECUTOR,
  executorSignOutSuccess
} from "../actions/executor/signOut.executor.actions";
import {
  CONFIRM_EXECUTOR,
  executorConfirmFailed,
  executorConfirmSuccess
} from "../actions/executor/confirm.executor.actions";
import axios from "axios";
import { storeToken, clearToken } from "../authentication";

export function* watchExecutorSignUpSaga() {
  yield takeLeading(SIGNUP_EXECUTOR, function*({ payload }) {
    try {
      yield call(axios.post, "/api/companies/register", payload);
      yield put(executorSignUpSuccess());
    } catch (err) {
      yield put(executorSignUpFailed(err.data));
    }

    //yield call(storeToken, response.data.token, response.data.user);
    // yield put(push("/")); // Редирект
  });
}

export function* watchExecutorConfirmSaga() {
  yield debounce(1000, CONFIRM_EXECUTOR, function*({ payload }) {
    try {
      console.log(payload)
      const response = yield call(axios.put, "/api/companies/confirm", payload);
      if (response.status < 200 && response.status > 300) throw response.data;

      yield put(executorConfirmSuccess(response.data));
      yield call(storeToken, response.data.token, response.data.user);
    } catch (err) {
      yield put(executorConfirmFailed(err));
    }
  });
}

export function* watchExecutorSignInSaga() {
  yield takeLeading(SIGNIN_EXECUTOR, function*({ payload }) {
    const response = yield call(axios.post, "/api/companies/signin", payload);

    if (!response.data.isVerified) {
      yield put(executorSignInNeedConfirm());
      yield take(CONFIRM_EXECUTOR);
    } else {
      console.log(response.data)
      yield put(executorSignInSuccess(response.data));
      yield call(storeToken, response.data.token, response.data.user);
      yield take(SIGNOUT_EXECUTOR);
    }
    // yield put(push("/")); // Редирект
  });
}

export function* watchExecutorSignOutSaga() {
  yield takeEvery(SIGNOUT_EXECUTOR, function*() {
    yield call(clearToken);
    yield put(executorSignOutSuccess());
  });
}
