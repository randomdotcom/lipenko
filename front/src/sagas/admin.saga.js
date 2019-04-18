import axios from "axios";
import { push } from "connected-react-router";
import { call, put, takeLeading } from "redux-saga/effects";
import {
  EDIT_ADMIN,
  adminEdited,
  CHANGE_PASSWORD_ADMIN,
  adminPasswordChanged
} from "../actions/auth.actions";
import { returnError, returnEvent } from "../actions/events.actions";
import { getAuthHeader } from "../services/jwtHeader";

export function* watchEditAdmin() {
  yield takeLeading(EDIT_ADMIN, function* ({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(axios.put, "/api/admin/edit", payload, { headers });

      yield put(adminEdited(payload));
      yield put(push("/profile"));
      yield put(returnEvent("Your profile is changed"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchChangePasswordAdmin() {
  yield takeLeading(CHANGE_PASSWORD_ADMIN, function* ({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(axios.put, "/api/admin/newPassword", payload, { headers });

      yield put(adminPasswordChanged());
      yield put(returnEvent("Your password is changed"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}