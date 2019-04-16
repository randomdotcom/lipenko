import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { userLoaded, LOAD_USER } from "../actions/auth.actions";
import { returnError } from "../actions/events.actions";

function* loadUserSaga() {
  try {
    const response = yield call(axios.get, "/api/users/current");
    yield put(userLoaded(response.data));
  } catch (error) {
    yield put(returnError(error.response.data));
  }
}

export function* watchLoadUserSaga() {
  yield takeLatest(LOAD_USER, loadUserSaga);
}
