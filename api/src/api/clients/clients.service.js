const jwt = require("jsonwebtoken");
const config = require("../../config/environment");

const userMock = require("../../../__mock__/users");
const users = userMock;

async function authenticate({ username, password }) {
  const user = users.find(
    _ => _.username === username && _.password === password
  );
  if (user) {
    const token = jwt.sign(
      { sub: user.id, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiration }
    );
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token
    };
  }
}

async function logout({ token }) {
  return true;
}

module.exports = {
  authenticate,
  logout
};