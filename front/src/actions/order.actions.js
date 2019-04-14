export const CHOOSE_COMPANY = "ORDER: CHOICE COMPANY...";
export const chooseCompany = data => ({
  type: CHOOSE_COMPANY,
  payload: data
});

export const COMPANY_CHOSEN = "ORDER: COMPANY CHOSEN";
export const companyChosen = data => ({
  type: COMPANY_CHOSEN,
  payload: data
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
