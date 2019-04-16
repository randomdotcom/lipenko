import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { companyLoaded, LOAD_COMPANY } from "../actions/companies.actions";
import { returnError } from "../actions/events.actions";

export function* watchLoadCompanySaga() {
  yield takeLatest(LOAD_COMPANY, function*({ payload }) {
    try {
      const response = yield call(axios.get, `/api/companies/${payload}`);
      yield put(companyLoaded(response.data));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}
