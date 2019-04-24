import axios from "axios";
import { push } from "connected-react-router";
import { call, put, take, takeLeading, takeEvery } from "redux-saga/effects";
import { storeToken, clearToken } from "../authentication";
import { SIGNOUT, signOutSuccess } from "../actions/common.actions";
import {
  SIGNIN_USER,
  userSignInSuccess,
  userSignInNeedConfirm,
  SIGNUP_USER,
  userSignUpSuccess,
  CONFIRM_USER,
  userConfirmSuccess,
  USER_NEW_VERIFICATION_CODE,
  userNewVerificationCodeSuccess,
  AUTH_SOCIAL
} from "../actions/userAuth.actions";
import { returnError, returnEvent } from "../actions/events.actions";

export function* watchUserSignUpSaga() {
  yield takeLeading(SIGNUP_USER, function*({ payload }) {
    try {
      yield call(axios.post, "/api/clients/register", payload);
      yield put(userSignUpSuccess(payload.username));
      yield put(returnEvent("Verification code is sended by e-mail"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchUserConfirmSaga() {
  yield takeLeading(CONFIRM_USER, function*({ payload }) {
    try {
      const response = yield call(axios.put, "/api/clients/confirm", payload);
      const { token, ...user } = response.data;

      yield put(userConfirmSuccess({ token, user }));
      yield call(storeToken, response.data);
      yield put(push("/"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchUserNewVerificationCode() {
  yield takeLeading(USER_NEW_VERIFICATION_CODE, function*({ payload }) {
    try {
      yield call(axios.put, "/api/clients/newVerificationCode", payload);
      yield put(userNewVerificationCodeSuccess());
      yield put(returnEvent("New verification code is sended by email"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchUserSignInSaga() {
  yield takeLeading(SIGNIN_USER, function*({ payload }) {
    try {
      const response = yield call(axios.post, "/api/clients/signin", payload);

      if (!response.data.isVerified) {
        yield put(userSignInNeedConfirm(payload.username));
        yield take(CONFIRM_USER);
      } else {
        const { token, ...user } = response.data;

        yield put(userSignInSuccess({ token, user }));
        yield call(storeToken, response.data);
        yield put(push("/"));

        yield take(SIGNOUT);
      }
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchAuthSocial() {
  yield takeLeading(AUTH_SOCIAL, function*({ payload }) {
    try {
      const response = yield call(axios.post, "/api/clients/google", {
        access_token: payload.accessToken
      });

      yield call(storeToken, {
        token: response.data.token,
        ...response.data.user
      });

      yield put(
        userSignInSuccess({
          token: response.data.token,
          user: response.data.user
        })
      );
      yield push("/profile");
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchSignOutSaga() {
  yield takeEvery(SIGNOUT, function*() {
    try {
      yield call(clearToken);
      yield put(signOutSuccess());
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}
