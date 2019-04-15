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
  offersFound,
  RESET_SELECTED_COMPANY,
  selectedCompanyReset,
  CALCULATE_TIME_PRICE,
  timePriceCalculated
} from "../actions/order.actions";
import { returnErrors } from "../actions/errors.actions";
import { calculatePrice, calculateTime } from "../services/priceTimeCalculate";

export function* watchChooseCompany() {
  yield takeLatest(CHOOSE_COMPANY, function*({ payload }) {
    yield put(companyChosen(payload));
    yield put(push("/book"));
  });
}

export function* watchResetSelectedCompany() {
  yield takeLatest(RESET_SELECTED_COMPANY, function*() {
    yield put(selectedCompanyReset());
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

export function* watchCalculateTimePrice() {
  yield takeLatest(CALCULATE_TIME_PRICE, function*({ payload }) {
    const price = yield call(calculatePrice, payload);
    const time = yield call(calculateTime, payload);

    yield put(timePriceCalculated({ price, time }));
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
        workingDays: payload.cleaningDays.join(',')
      };
      
      yield put(push(`/companies?${stringify(query)}`));

      yield put(offersFound(payload));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}
