import axios from "axios";
import { push } from "connected-react-router";
import { call, put, takeLeading } from "redux-saga/effects";
import {
  EDIT_USER,
  userEdited,
  CHANGE_PASSWORD_USER,
  userPasswordChanged,
  CONFIRM_BOOK,
  bookConfirmed
} from "../actions/user.actions";
import { CANCEL_BOOK, bookCanceled } from "../actions/common.actions";
import { loadBookings } from "../actions/bookings.actions";
import { returnError, returnEvent } from "../actions/events.actions";
import { getAuthHeader } from "../services/jwtHeader";

export function* watchEditUser() {
  yield takeLeading(EDIT_USER, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(axios.put, "/api/clients/edit", payload, { headers });

      yield put(userEdited(payload));
      yield put(push("/profile"));
      yield put(returnEvent("Your profile is changed"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchChangePasswordUser() {
  yield takeLeading(CHANGE_PASSWORD_USER, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(axios.put, "/api/clients/newPassword", payload, { headers });

      yield put(userPasswordChanged());
      yield put(returnEvent("Your password is changed"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchCancelBook() {
  yield takeLeading(CANCEL_BOOK, function*({ payload }) {
    try {
      const { orderId, query, reason } = payload;

      const headers = getAuthHeader();
      yield call(
        axios.put,
        "/api/orders/cancel",
        { orderId, reason },
        {
          headers
        }
      );

      yield put(bookCanceled());
      yield put(loadBookings(query));
      yield put(returnEvent("The book is canceled"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchConfirmBook() {
  yield takeLeading(CONFIRM_BOOK, function*({ payload }) {
    try {
      const { orderId, query } = payload;

      const headers = getAuthHeader();
      yield call(
        axios.put,
        "/api/orders/confirm",
        { orderId },
        {
          headers
        }
      );

      yield put(bookConfirmed());
      yield put(loadBookings(query));
      yield put(returnEvent("The book is confirmed"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}
