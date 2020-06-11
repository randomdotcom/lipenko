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
  bookAccepted,
  UPLOAD_LOGO,
  logoUploaded
} from "../actions/executor.actions";
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
      yield put(returnEvent("Профиль успешно изменен"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchUploadLogoExecutor() {
  yield takeLeading(UPLOAD_LOGO, function*({ payload }) {
    try {
      const data = new FormData();
      data.append("logo", payload);

      const headers = getAuthHeader();
      const response = yield call(
        axios.put,
        "/api/companies/edit/uploadLogo",
        data,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      const { logoUrl, logoName } = response.data;
      yield put(logoUploaded({ logoUrl, logoName }));
      yield put(returnEvent("Логотип успешно изменен"));
    } catch (error) {
      console.log(error);
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
      yield put(returnEvent("Профиль успешно изменен"));
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
      yield put(returnEvent("Пароль успешно изменен"));
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
      yield put(returnEvent("Заказ успешно принят"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}
