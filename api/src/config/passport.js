const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const config = require("./environment");
const User = require("../models/user.model");

function jwtStrategy() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
  };

  const strategy = new Strategy(opts, async (token, done) => {
    const user = await User.findOne({ _id: token.id });
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
