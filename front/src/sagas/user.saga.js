import axios from "axios";
import { push } from "connected-react-router";
import { call, put, take, takeLeading, takeEvery } from "redux-saga/effects";
import {
  EDIT_USER,
  userEdited,
  CHANGE_PASSWORD_USER,
  userPasswordChanged
} from "../actions/auth.actions";
import { returnErrors } from "../actions/errors.actions";
import {getAuthHeader} from '../services/jwtHeader'

export function* watchEditUser() {
  yield takeLeading(EDIT_USER, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(axios.put, '/api/clients/edit', payload, {headers});

      yield put(userEdited(payload));
      yield put(push('/profile'))
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchChangePasswordUser() {
  yield takeLeading(CHANGE_PASSWORD_USER, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(axios.put, '/api/clients/newPassword', payload, {headers});

      yield put(userPasswordChanged());
      yield put(push('/profile'))
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}
