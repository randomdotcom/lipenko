export const SIGN_IN = "SIGN_IN";

export const signIn = (user) => ({
  type: SIGN_IN,
  username: user.username,
  email: user.email,
  phoneNumber: user.phoneNumber
});
