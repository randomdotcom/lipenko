import axios from "axios";
import { push } from "connected-react-router";
import { call, put, take, takeLeading, takeEvery } from "redux-saga/effects";
import {
  EDIT_USER,
  userEdited
} from "../actions/auth.actions";
import { returnErrors } from "../actions/errors.actions";
import {getAuthHeader} from '../services/jwtHeader'

const editProfileRequest = (options) => {
  return axios(options)
}

export function* watchEditUser() {
  yield takeLeading(EDIT_USER, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      console.log("headers "+headers)
      yield call(editProfileRequest, {method: 'put', url: '/api/clients/edit', data: payload, headers});
      yield put(userEdited(payload));
      yield push('/profile')
    } catch (error) {
      console.log(JSON.stringify(error));
      yield put(returnErrors(error.response.data));
    }
  });
}
