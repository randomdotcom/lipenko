import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { userLoaded, LOAD_USER } from "../actions/auth.actions";

function* loadUserSaga() {
  const response = yield call(axios.get, "/api/users/current");
  yield put(userLoaded(response.data));
}

export function* watchLoadUserSaga() {
  yield takeLatest(LOAD_USER, loadUserSaga);
}
