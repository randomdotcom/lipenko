import axios from "axios";
import { push } from "connected-react-router";
import { call, put, takeLeading } from "redux-saga/effects";
import {
  EDIT_ADMIN,
  adminEdited,
  CHANGE_PASSWORD_ADMIN,
  adminPasswordChanged,
  BLOCK_COMPANY,
  companyBlocked,
  UNBLOCK_COMPANY,
  companyUnblocked
} from "../actions/admin.actions";
import { returnError, returnEvent } from "../actions/events.actions";
import { getAuthHeader } from "../services/jwtHeader";

export function* watchEditAdmin() {
  yield takeLeading(EDIT_ADMIN, function*({ payload }) {
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
  yield takeLeading(CHANGE_PASSWORD_ADMIN, function*({ payload }) {
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

export function* watchBlockCompany() {
  yield takeLeading(BLOCK_COMPANY, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(
        axios.put,
        `/api/companies/${payload.companyId}/block`,
        payload,
        { headers }
      );

      yield put(companyBlocked(payload));
      yield put(returnEvent("The company is blocked"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchUnblockCompany() {
  yield takeLeading(UNBLOCK_COMPANY, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(
        axios.put,
        `/api/companies/${payload.companyId}/unblock`,
        payload,
        { headers }
      );

      yield put(companyUnblocked());
      yield put(returnEvent("The company is unblocked"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}
