const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const config = require("./environment");
const User = require("../models/user.model");
const Executor = require("../models/executor.model");
const Admin = require("../models/admin.model.js");

function jwtStrategy() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
  };

  const strategy = new Strategy(opts, async (token, done) => {
    const user = await User.findOne({ _id: token.id });
    const executor = await Executor.findOne({ _id: token.id });
    const admin = await Admin.findOne({ _id:  token.id});

    if (user) {
      return done(null, user);
    } else if (executor) { 
      return done(null, executor);
    } else if (admin) {
      return done(null, admin);
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
