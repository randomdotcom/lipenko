import { call, put, take, takeLeading, takeEvery } from "redux-saga/effects";
import {
  SIGNIN_USER,
  SIGNUP_USER,
  SIGNOUT_USER,
  userSignInSuccess,
  userSignUpSuccess,
  userSignOutSuccess
} from "../actions/user.actions";

import axios from "axios";
import { storeToken, clearToken } from "../authentication";

export function* watchUserSignUpSaga() {
  yield takeLeading(SIGNUP_USER, function*({ payload }) {
    console.log("logging in");

    const response = yield call(axios.post, "/api/clients/register", payload);
    console.log('OK')
    yield put(userSignUpSuccess(response.data.username));
    console.log('OK')
    yield call(storeToken, response.data.token, response.data.user);
    // yield put(push("/")); // Редирект

    //yield take(SIGNOUT_USER);
  });
}

export function* watchUserSignInSaga() {
  yield takeLeading(SIGNIN_USER, function*({ payload }) {
    console.log("logging in");

    const response = yield call(axios.post, "/api/clients/signin", payload);
    console.log('OK')
    yield put(userSignInSuccess(response.data.token, response.data.user));
    console.log('OK')
    yield call(storeToken, response.data.token, response.data.user);
    // yield put(push("/")); // Редирект

    yield take(SIGNOUT_USER);
  });
}

export function* watchUserSignOutSaga() {
  yield takeEvery(SIGNOUT_USER, function*() {
    yield call(clearToken);
    yield put(userSignOutSuccess());
  });
}
