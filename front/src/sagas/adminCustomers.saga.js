import axios from "axios";
import { parse, stringify } from "query-string";
import {
  call,
  put,
  takeLatest,
  takeEvery,
  takeLeading
} from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  customersLoaded,
  LOAD_CUSTOMERS,
  CHANGE_FILTERS_CUSTOMERS,
  loadCustomers,
  BLOCK_CUSTOMER,
  customerBlocked,
  UNBLOCK_CUSTOMER,
  customerUnblocked
} from "../actions/admin.actions";
import { returnError, returnEvent } from "../actions/events.actions";
import { getAuthHeader } from "../services/jwtHeader";

export function* watchLoadCustomersSaga() {
  yield takeLatest(LOAD_CUSTOMERS, function*({ payload }) {
    try {
      const query = payload;

      const headers = yield call(getAuthHeader);
      const response = yield call(axios.get, `/api/clients?${query}`, {
        headers
      });
      yield put(customersLoaded(response.data));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchChangeFiltersCustomersSaga() {
  yield takeEvery(CHANGE_FILTERS_CUSTOMERS, function*({ payload }) {
    try {
      const { name, value, path } = payload;
      let query = parse(payload.query);

      if (name) {
        query[`${name}`] = value;
      }

      yield put(push(`${path}?${stringify(query)}`));
      yield put(loadCustomers(stringify(query)));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchBlockCustomer() {
  yield takeLeading(BLOCK_CUSTOMER, function*({ payload }) {
    try {
      const { customerId, query } = payload;

      const headers = getAuthHeader();
      yield call(axios.put, `/api/clients/${customerId}/block`, payload, {
        headers
      });

      yield put(customerBlocked(payload));
      yield put(loadCustomers(query));
      yield put(returnEvent("The customer is blocked"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchUnblockCustomer() {
  yield takeLeading(UNBLOCK_CUSTOMER, function*({ payload }) {
    try {
      const { customerId, query } = payload;

      const headers = getAuthHeader();
      yield call(axios.put, `/api/clients/${customerId}/unblock`, payload, {
        headers
      });

      yield put(customerUnblocked());
      yield put(loadCustomers(query));
      yield put(returnEvent("The customer is unblocked"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}
