import axios from "axios";
import { push } from "connected-react-router";
import { call, put, takeLeading } from "redux-saga/effects";
import {
  EDIT_MAIN_INFO_EXECUTOR,
  executorMainInfoEdited,
  EDIT_TOC_EXECUTOR,
  executorTypesOfCleaningEdited,
  CHANGE_PASSWORD_EXECUTOR,
  executorPasswordChanged
} from "../actions/auth.actions";
import { returnErrors } from "../actions/errors.actions";
import { getAuthHeader } from "../services/jwtHeader";

export function* watchEditMainInfoExecutor() {
  yield takeLeading(EDIT_MAIN_INFO_EXECUTOR, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(axios.put, "/api/companies/edit/main", payload, { headers });

      yield put(executorMainInfoEdited(payload));
      yield put(push("/profile"));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchEditTOCExecutor() {
  yield takeLeading(EDIT_TOC_EXECUTOR, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      const response = yield call(
        axios.put,
        "/api/companies/edit/typesOfCleaning",
        payload,
        {
          headers
        }
      );

      yield put(executorTypesOfCleaningEdited(response.data));
      yield put(push("/profile"));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchChangePasswordExecutor() {
  yield takeLeading(CHANGE_PASSWORD_EXECUTOR, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(axios.put, "/api/companies/edit/newPassword", payload, {
        headers
      });

      yield put(executorPasswordChanged());
      yield put(push("/profile"));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}
