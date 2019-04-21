import axios from "axios";
import { put, call, takeLeading } from "redux-saga/effects";
import {
  LOAD_REVIEWS,
  reviewsLoaded,
  LOAD_MORE_REVIEWS,
  reviewsMoreLoaded,
  REVIEW_COMPANY,
  companyReviewed,
  reviewsReset,
  loadReviews
} from "../actions/reviews.actions";
import { returnError, returnEvent } from "../actions/events.actions";
import { getAuthHeader } from "../services/jwtHeader";

export function* watchLoadReviews() {
  yield takeLeading(LOAD_REVIEWS, function*({ payload }) {
    try {
      const { page = 1, companyId } = payload;

      const response = yield call(
        axios.put,
        `/api/companies/${companyId}/reviews`,
        {
          page
        }
      );

      yield put(reviewsLoaded(response.data));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchLoadMoreReviews() {
  yield takeLeading(LOAD_MORE_REVIEWS, function*({ payload }) {
    try {
      const { page, companyId } = payload;

      const response = yield call(
        axios.put,
        `/api/companies/${companyId}/reviews`,
        {
          page
        }
      );

      yield put(reviewsMoreLoaded(response.data));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}

export function* watchReviewCompany() {
  yield takeLeading(REVIEW_COMPANY, function*({ payload }) {
    try {
      const { companyId, ...body } = payload;

      const headers = getAuthHeader();
      const response = yield call(
        axios.put,
        `/api/companies/${companyId}/rate`,
        body,
        { headers }
      );

      yield put(companyReviewed(response.data));
      yield put(returnEvent("Review added!", "success"));
      yield put(reviewsReset());
      yield put(loadReviews({ page: 1, companyId }));
    } catch (error) {
      yield put(returnError(error.response.data));
    }
  });
}
