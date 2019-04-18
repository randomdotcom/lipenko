import axios from "axios";
import { push } from "connected-react-router";
import { call, put, takeLeading } from "redux-saga/effects";
import {
  EDIT_MAIN_INFO_EXECUTOR,
  executorMainInfoEdited,
  EDIT_TOC_EXECUTOR,
  executorTypesOfCleaningEdited,
  CHANGE_PASSWORD_EXECUTOR,
  executorPasswordChanged,
  ACCEPT_BOOK,
  bookAccepted
} from "../actions/auth.actions";
import { loadBookings } from "../actions/bookings.actions";
import { returnError, returnEvent } from "../actions/events.actions";
import { getAuthHeader } from "../services/jwtHeader";

export function* watchEditMainInfoExecutor() {
  yield takeLeading(EDIT_MAIN_INFO_EXECUTOR, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(axios.put, "/api/companies/edit/main", payload, { headers });

      yield put(executorMainInfoEdited(payload));
      yield put(push("/profile"));
      yield put(returnEvent("Your profile is changed"));
    } catch (error) {
      yield put(returnError(error.response.data));
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
      yield put(returnEvent("Your profile is changed"));
    } catch (error) {
      yield put(returnError(error.response.data));
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
      yield put(returnEvent("Your password is changed"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchAcceptBook() {
  yield takeLeading(ACCEPT_BOOK, function*({ payload }) {
    try {
      const { orderId, query } = payload;

      const headers = getAuthHeader();
      yield call(
        axios.put,
        "/api/orders/accept",
        { orderId },
        {
          headers
        }
      );

      yield put(bookAccepted());
      yield put(loadBookings(query));
      yield put(returnEvent("The book is accepted"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}
