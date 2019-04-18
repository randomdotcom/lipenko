import axios from "axios";
import { push } from "connected-react-router";
import { call, put, take, takeLeading } from "redux-saga/effects";
import { storeToken } from "../authentication";
import { returnError } from "../actions/events.actions";
import {
  SIGNOUT,
  SIGNIN_ADMIN,
  adminSignInSuccess
} from "../actions/auth.actions";

export function* watchAdminSignInSaga() {
  yield takeLeading(SIGNIN_ADMIN, function*({ payload }) {
    try {
      const response = yield call(axios.post, "/api/admin/signin", payload);

      const { token, ...user } = response.data;

      yield put(adminSignInSuccess({ token, user }));
      yield call(storeToken, response.data);
      yield put(push("/"));

      yield take(SIGNOUT);
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}
