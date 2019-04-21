export const LOAD_REVIEWS = "REVIEWS: LOAD...";
export const loadReviews = data => ({
  type: LOAD_REVIEWS,
  payload: data
});

export const REVIEWS_LOADED = "REVIEWS: LOADED";
export const reviewsLoaded = data => ({
  type: REVIEWS_LOADED,
  payload: data
});

export const LOAD_MORE_REVIEWS = "REVIEWS: LOAD MORE...";
export const loadMoreReviews = data => ({
  type: LOAD_MORE_REVIEWS,
  payload: data
});

export const REVIEWS_MORE_LOADED = "REVIEWS: MORE LOADED";
export const reviewsMoreLoaded = data => ({
  type: REVIEWS_MORE_LOADED,
  payload: data
});

export const REVIEW_COMPANY = "REVIEWS: REVIEW COMPANY...";
export const reviewCompany = data => ({
  type: REVIEW_COMPANY,
  payload: data
});

export const COMPANY_REVIEWED = "REVIEWS: COMPANY REVIEWED";
export const companyReviewed = data => ({
  type: COMPANY_REVIEWED,
  payload: data
});

export const REVIEWS_RESET = "REVIEWS: RESET";
export const reviewsReset = () => ({
  type: REVIEWS_RESET
});
