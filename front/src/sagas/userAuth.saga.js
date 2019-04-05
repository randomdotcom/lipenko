import { call, put, take, takeLeading, takeEvery } from "redux-saga/effects";
import {
  SIGNIN_USER,
  userSignInSuccess,
  userSignInNeedConfirm
} from "../actions/user/signIn.user.actions";
import {
  SIGNUP_USER,
  userSignUpSuccess,
  userSignUpFailed
} from "../actions/user/signUp.user.actions";
import {
  SIGNOUT_USER,
  userSignOutSuccess
} from "../actions/user/signOut.user.actions";
import {
  CONFIRM_USER,
  userConfirmFailed,
  userConfirmSuccess
} from "../actions/user/confirm.user.actions";
import axios from "axios";
import { storeToken, clearToken } from "../authentication";

export function* watchUserSignUpSaga() {
  yield takeLeading(SIGNUP_USER, function*({ payload }) {
    try {
      yield call(axios.post, "/api/clients/register", payload);
      yield put(userSignUpSuccess(payload.username));
    } catch (err) {
      yield put(userSignUpFailed(err.data));
    }

    //yield call(storeToken, response.data.token, response.data.user);
    // yield put(push("/")); // Редирект
  });
}

export function* watchUserConfirmSaga() {
  yield takeLeading(CONFIRM_USER, function*({ payload }) {
    console.log(`payload: ${payload}`);
    try {
      const response = yield call(axios.put, "/api/clients/confirm", payload);
      if (response.status < 200 && response.status > 300) throw response.data;

      yield put(userConfirmSuccess(response.data));
      yield call(storeToken, response.data.token, response.data.user);
    } catch (err) {
      yield put(userConfirmFailed(err));
    }
  });
}

export function* watchUserSignInSaga() {
  yield takeLeading(SIGNIN_USER, function*({ payload }) {
    const response = yield call(axios.post, "/api/clients/signin", payload);
    if (!response.data.isVerified) {
      yield put(userSignInNeedConfirm(payload.username));
      yield take(CONFIRM_USER);
    } else {    
      yield put(userSignInSuccess(response.data));
      console.log(response.data);
      yield call(storeToken, response.data.token, response.data.user);
      yield take(SIGNOUT_USER);
    }
    // yield put(push("/")); // Редирект
  });
}

export function* watchUserSignOutSaga() {
  yield takeEvery(SIGNOUT_USER, function*() {
    yield call(clearToken);
    yield put(userSignOutSuccess());
  });
}
