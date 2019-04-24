export const LOAD_BOOKINGS = "BOOKINGS: LOAD...";
export const loadBookings = query => ({
  type: LOAD_BOOKINGS,
  payload: query
});

export const BOOKINGS_LOADED = "BOOKINGS: LOADED";
export const bookingsLoaded = data => ({
  type: BOOKINGS_LOADED,
  payload: data
});

export const CHANGE_FILTERS_BOOKINGS = "BOOKINGS: NEW FILTERS...";
export const changeFiltersBookings = data => ({
  type: CHANGE_FILTERS_BOOKINGS,
  payload: data
});