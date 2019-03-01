const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const config = require("./environment");
const usersMock = require("../../__mock__/users");

function jwtStrategy() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
  };

  const strategy = new Strategy(opts, (token, done) => {
    var user = usersMock.find(user => {
      return user.id === token.sub;
    });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });

  passport.use(strategy);
}

module.exports = {
  initialize: () => passport.initialize(),
  authenticate: () => passport.authenticate("jwt", { session: false }),
  jwtStrategy
};