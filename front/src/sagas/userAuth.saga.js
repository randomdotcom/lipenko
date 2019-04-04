import { call, put, take, takeLeading, takeEvery } from "redux-saga/effects";
import {
  SIGNIN_USER,
  SIGNUP_USER,
  SIGNOUT_USER,
  CONFIRM_USER,
  userSignInSuccess,
  userSignUpSuccess,
  userSignOutSuccess,
  userConfirmSuccess,
  userConfirmFailed,
  userSignUpFailed
} from "../actions/user.actions";

import axios from "axios";
import { storeToken, clearToken } from "../authentication";

export function* watchUserSignUpSaga() {
  yield takeLeading(SIGNUP_USER, function* ({ payload }) {
    try {
      yield call(axios.post, "/api/clients/register", payload);
      yield put(userSignUpSuccess());
    } catch (err) {
      console.log(err);
      yield put(userSignUpFailed(err.data));
    }

    //yield call(storeToken, response.data.token, response.data.user);
    // yield put(push("/")); // Редирект
  });
}

export function* watchUserConfirmSaga() {
  yield takeLeading(CONFIRM_USER, function* ({ payload }) {
    try { // Не через catch, глянуть response и как определить что это ошибка
      const response = yield call(axios.put, "/api/clients/confirm", payload);
      if (response.status < 200 && response.status > 300) throw response;
      console.log(`response ${JSON.stringify(response)}`);

      yield put(userConfirmSuccess(response.data));
    } catch (err) {
      console.log(`watchUserConfirmSaga Error: ${err}`);
      yield put(userConfirmFailed(err));
    }
  });
}

export function* watchUserSignInSaga() {
  yield takeLeading(SIGNIN_USER, function* ({ payload }) {
    const response = yield call(axios.post, "/api/clients/signin", payload);
    yield put(userSignInSuccess(response.data.token, response.data.user));
    yield call(storeToken, response.data.token, response.data.user);
    // yield put(push("/")); // Редирект

    yield take(SIGNOUT_USER);
  });
}

export function* watchUserSignOutSaga() {
  yield takeEvery(SIGNOUT_USER, function* () {
    yield call(clearToken);
    yield put(userSignOutSuccess());
  });
}
