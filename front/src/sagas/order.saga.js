import axios from "axios";
import { parse, stringify } from "query-string";
import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  CHOOSE_COMPANY,
  companyChosen,
  BOOK_CLEANING,
  cleaningBooked
} from "../actions/order.actions";
import { returnErrors } from "../actions/errors.actions";

export function* watchChooseCompany() {
  yield takeLatest(CHOOSE_COMPANY, function*({ payload }) {
    yield put(companyChosen(payload));
    yield put(push("/book"));
  });
}

export function* watchBookCleaning() {
  yield takeLatest(BOOK_CLEANING, function*({ payload }) {
    try {
      const response = yield call(axios.post, "/api/orders/create", payload);

      yield put(cleaningBooked(response.data));
      yield put(push("/profile"));
    } catch (errors) {
      yield put(returnErrors(errors));
    }
  });
}
