import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { companiesLoaded, LOAD_COMPANIES } from "../actions/companies.actions";



export function* watchLoadUserSaga() {
  yield takeLatest(LOAD_COMPANIES, function*() {
    const response = yield call(axios.get, "/api/companies");
    yield put(companiesLoaded(response.data));
  });
}