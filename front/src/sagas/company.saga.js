import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { companyLoaded, LOAD_COMPANY } from "../actions/companies.actions";
import { returnErrors } from "../actions/errors.actions";

export function* watchLoadCompanySaga() {
  yield takeLatest(LOAD_COMPANY, function*({ payload }) {
    try {
      console.log(payload);
      const response = yield call(axios.get, `/api/companies/${payload}`);
      yield put(companyLoaded(response.data));
    } catch (error) {
      yield put(returnErrors(error));
    }
  });
}
