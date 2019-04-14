import axios from "axios";
import { parse, stringify } from "query-string";
import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  CHOOSE_COMPANY,
  companyChosen,
  BOOK_CLEANING,
  cleaningBooked,
  LOOK_OFFERS,
  offersFound
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

export function* watchLookOffers() {
  yield takeLatest(LOOK_OFFERS, function*({ payload }) {
    try {
      const query = {
        city: payload.city,
        type: payload.type,
        pool: payload.service.indexOf("pool") != -1 ? true : undefined,
        furniture:
          payload.service.indexOf("furniture") !== -1 ? true : undefined,
        carpet: payload.service.indexOf("carpet") !== -1 ? true : undefined,
        cleaningDays: { ...payload.cleaningDays }
      };

      yield put(push(`/companies?${stringify(query)}`));

      yield put(offersFound(payload));
    } catch (errors) {
      yield put(returnErrors(errors));
    }
  });
}
