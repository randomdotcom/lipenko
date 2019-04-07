export const LOAD_COMPANIES = "COMPANIES: LOAD...";
export const loadCompanies = () => ({
  type: LOAD_COMPANIES
});

export const COMPANIES_LOADED = "COMPANIES: LOADED";
export const companiesLoaded = data => ({
  type: COMPANIES_LOADED,
  payload: data
});