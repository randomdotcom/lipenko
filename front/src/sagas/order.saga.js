import axios from "axios";
import { stringify } from "query-string";
import { call, put, takeLatest } from "redux-saga/effects";
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
import { returnError, returnEvent } from "../actions/events.actions";
import { calculatePrice, calculateTime } from "../services/priceTimeCalculate";

export function* watchChooseCompany() {
  yield takeLatest(CHOOSE_COMPANY, function*({ payload }) {
    try {
      yield put(companyChosen(payload));
      yield put(push("/book"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchResetSelectedCompany() {
  yield takeLatest(RESET_SELECTED_COMPANY, function*() {
    try {
      yield put(selectedCompanyReset());
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchBookCleaning() {
  yield takeLatest(BOOK_CLEANING, function*({ payload }) {
    try {
      const response = yield call(axios.post, "/api/orders/create", payload);

      yield put(cleaningBooked(response.data));
      yield put(push("/companies"));
      yield put(returnEvent("The cleaning booked, expect an e-mail message"));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchCalculateTimePrice() {
  yield takeLatest(CALCULATE_TIME_PRICE, function*({ payload }) {
    try {
      const price = yield call(calculatePrice, payload);
      const time = yield call(calculateTime, payload);

      yield put(timePriceCalculated({ price, time }));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchLookOffers() {
  yield takeLatest(LOOK_OFFERS, function*({ payload }) {
    try {
      const query = {
        city: payload.city,
        type: payload.type,
        pool: payload.service.indexOf("pool") !== -1 ? true : undefined,
        furniture:
          payload.service.indexOf("furniture") !== -1 ? true : undefined,
        carpet: payload.service.indexOf("carpet") !== -1 ? true : undefined,
        workingDays: payload.cleaningDays.join(",")
      };

      yield put(push(`/companies?${stringify(query)}`));

      yield put(offersFound(payload));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}
