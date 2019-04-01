export const SIGN_IN_USER = "SIGN_IN_USER";
export const SIGN_IN_EXECUTOR = "SIGN_IN_EXECUTOR"

export const signInUser = (user) => ({
  type: SIGN_IN_USER,
  username: user.username,
  email: user.email,
  phoneNumber: user.phoneNumber,
  adress: user.adress,
  role: user.role
});

export const signInExecutor = (executor) => ({
  type: SIGN_IN_EXECUTOR,
  username: executor.username,
  email: executor.email,
  phoneNumber: executor.phoneNumber,
  city: executor.city,
  description: executor.description,
  companyName: executor.companyName,
  typesOfCleaning: executor.typesOfCleaning,
  role: executor.role
})

