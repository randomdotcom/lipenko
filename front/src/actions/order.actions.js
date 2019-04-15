export const CHOOSE_COMPANY = "ORDER: CHOICE COMPANY...";
export const chooseCompany = (id, workingDays, typesOfCleaning, city) => ({
  type: CHOOSE_COMPANY,
  payload: {id, workingDays, typesOfCleaning, city}
});

export const COMPANY_CHOSEN = "ORDER: COMPANY CHOSEN";
export const companyChosen = data => ({
  type: COMPANY_CHOSEN,
  payload: data
});

export const RESET_SELECTED_COMPANY = "ORDER: RESET SELECTED COMPANY...";
export const resetSelectedCompany = () => ({
  type: RESET_SELECTED_COMPANY
});

export const SELECTED_COMPANY_RESET = "ORDER: SELECTED COMPANY RESET";
export const selectedCompanyReset = () => ({
  type: SELECTED_COMPANY_RESET
});

export const BOOK_CLEANING = "ORDER: BOOK CLEANING...";
export const bookCleaning = data => ({
  type: BOOK_CLEANING,
  payload: data
});

export const CLEANING_BOOKED = "ORDER: CLEANING BOOKED";
export const cleaningBooked = () => ({
  type: CLEANING_BOOKED
});

export const LOOK_OFFERS = "ORDER: LOOK OFFERS...";
export const lookOffers = data => ({
  type: LOOK_OFFERS,
  payload: data
});

export const OFFERS_FOUND = "ORDER: OFFERS FOUND";
export const offersFound = data => ({
  type: OFFERS_FOUND,
  payload: data
});

export const CALCULATE_TIME_PRICE = "ORDER: CALCULATE TIME AND PRICE...";
export const calculateTimePrice = data => ({
  type: CALCULATE_TIME_PRICE,
  payload: data
});

export const TIME_RPICE_CALCULATED = "ORDER: TIME AND PRICE CALCULATED";
export const timePriceCalculated = data => ({
  type: TIME_RPICE_CALCULATED,
  payload: data
});

