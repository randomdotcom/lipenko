export const LOAD_COMPANIES = "COMPANIES: LOAD...";
export const loadCompanies = query => ({
  type: LOAD_COMPANIES,
  payload: query
});

export const COMPANIES_LOADED = "COMPANIES: LOADED";
export const companiesLoaded = data => ({
  type: COMPANIES_LOADED,
  payload: data
});

export const CHANGE_FILTERS_COMPANIES = "COMPANIES: NEW FILTERS...";
export const changeFiltersCompanies = data => ({
  type: CHANGE_FILTERS_COMPANIES,
  payload: data
})