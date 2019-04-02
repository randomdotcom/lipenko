import { call, put, take, takeLeading, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  SIGNIN_USER,
  SIGNOUT_USER,
  userSignInSuccess,
  userSignOutSuccess
} from "../actions/user.actions";
import axios from "axios";
import { storeToken, clearToken } from "../authentication";

export function* watchUserSignInSaga() {
  yield takeLeading(SIGNIN_USER, function*({ payload }) {
    console.log("logging in");

    const response = yield call(axios.post, "/api/login", payload);
    yield put(userSignInSuccess(response.data.token, response.data.user));
    yield call(storeToken, response.data.token, response.data.user);
    yield put(push("/"));

    yield take(SIGNOUT_USER);
  });
}

export function* watchUserSignOutSaga() {
  yield takeEvery(SIGNOUT_USER, function*() {
    yield call(clearToken);
    yield put(userSignOutSuccess());
  });
}
