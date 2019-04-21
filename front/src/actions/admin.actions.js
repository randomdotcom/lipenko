export const EDIT_ADMIN = "ADMIN: EDIT...";
export const editAdmin = data => ({
  type: EDIT_ADMIN,
  payload: data
});

export const ADMIN_EDITED = "ADMIN: EDITED SUCCESSFUL";
export const adminEdited = data => ({
  type: ADMIN_EDITED,
  payload: data
});

export const CHANGE_PASSWORD_ADMIN = "ADMIN: CHANGE PASWORD...";
export const changePasswordAdmin = data => ({
  type: CHANGE_PASSWORD_ADMIN,
  payload: data
});

export const ADMIN_PASSWORD_CHANGED = "ADMIN: PASSWORD CHANGED";
export const adminPasswordChanged = () => ({
  type: ADMIN_PASSWORD_CHANGED
});

export const BLOCK_COMPANY = "ADMIN: BLOCK COMPANY...";
export const blockCompany = data => ({
  type: BLOCK_COMPANY,
  payload: data
});

export const COMPANY_BLOCKED = "ADMIN: COMPANY BLOCKED";
export const companyBlocked = data => ({
  type: COMPANY_BLOCKED,
  payload: data
});

export const UNBLOCK_COMPANY = "ADMIN: UNBLOCK COMPANY...";
export const unblockCompany = data => ({
  type: UNBLOCK_COMPANY,
  payload: data
});

export const COMPANY_UNBLOCKED = "ADMIN: COMPANY UNBLOCKED";
export const companyUnblocked = () => ({
  type: COMPANY_UNBLOCKED
});

export const LOAD_CUSTOMERS = "ADMIN: LOAD CUSTOMERS...";
export const loadCustomers = query => ({
  type: LOAD_CUSTOMERS,
  payload: query
});

export const CUSTOMERS_LOADED = "ADMIN: CUSTOMERS LOADED";
export const customersLoaded = data => ({
  type: CUSTOMERS_LOADED,
  payload: data
});

export const CHANGE_FILTERS_CUSTOMERS = "ADMIN: NEW CUSTOMER FILTERS...";
export const changeFiltersCustomers = data => ({
  type: CHANGE_FILTERS_CUSTOMERS,
  payload: data
});

export const BLOCK_CUSTOMER = "ADMIN: BLOCK CUSTOMER...";
export const blockCustomer = data => ({
  type: BLOCK_CUSTOMER,
  payload: data
});

export const CUSTOMER_BLOCKED = "ADMIN: CUSTOMER BLOCKED";
export const customerBlocked = data => ({
  type: CUSTOMER_BLOCKED,
  payload: data
});

export const UNBLOCK_CUSTOMER = "ADMIN: UNBLOCK CUSTOMER...";
export const unblockCustomer = data => ({
  type: UNBLOCK_CUSTOMER,
  payload: data
});

export const CUSTOMER_UNBLOCKED = "ADMIN: CUSTOMER UNBLOCKED";
export const customerUnblocked = () => ({
  type: CUSTOMER_UNBLOCKED
});
