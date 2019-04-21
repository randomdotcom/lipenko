import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { profileLoaded, LOAD_PROFILE, signOut } from "../actions/auth.actions";
import { getAuthHeader } from "../services/jwtHeader";

export function* watchLoadUserSaga() {
  yield takeLatest(LOAD_PROFILE, function*() {
    try {
      const headers = getAuthHeader();
      const response = yield call(axios.get, "/api/clients/current", {
        headers
      });

      yield put(profileLoaded(response.data));
    } catch (error) {
      console.log(error.response.data)
      yield put(signOut());
    }
  });
}
