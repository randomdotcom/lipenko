import axios from "axios";
import { parse, stringify } from "query-string";
import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  bookingsLoaded,
  LOAD_BOOKINGS,
  CHANGE_FILTERS_BOOKINGS,
  loadBookings
} from "../actions/bookings.actions";
import { returnError } from "../actions/events.actions";
import { getAuthHeader } from "../services/jwtHeader";

export function* watchLoadBookingsSaga() {
  yield takeLatest(LOAD_BOOKINGS, function*({ payload }) {
    try {
      const query = payload[0] === '?' ? payload : '?' + payload;

      const headers = yield call(getAuthHeader);
      
      const response = yield call(axios.get, `/api/orders${query}`, {
        headers
      });

      yield put(bookingsLoaded(response.data));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchChangeFiltersBookingsSaga() {
  yield takeEvery(CHANGE_FILTERS_BOOKINGS, function*({ payload }) {
    try {
      const { name, value, path } = payload;
      let query = parse(payload.query);

      if (name) {
        query[`${name}`] = value;
      }

      yield put(push(`${path}?${stringify(query)}`));
      yield put(loadBookings(stringify(query)));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}
