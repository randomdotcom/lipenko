const passport = require("passport");

const { ExtractJwt, Strategy } = require("passport-jwt");
const GoogleStrategy = require("passport-google-token").Strategy;

const randtoken = require("rand-token");
const jwt = require("jsonwebtoken");

const config = require("./environment");

const User = require("../models/user.model");
const Executor = require("../models/executor.model");
const Admin = require("../models/admin.model.js");

const Role = require("../enums/roles.enum");

function jwtStrategy() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
  };

  const strategy = new Strategy(opts, async (token, done) => {
    const user = await User.findOne({ _id: token.id });
    const executor = await Executor.findOne({ _id: token.id });
    const admin = await Admin.findOne({ _id: token.id });

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

function googleStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: `819223369500-aupgq5mbr3nemhukfim72qq4kbgrjqta.apps.googleusercontent.com`,
        clientSecret: `81gyZ-au7pTyKhdxmudGa2tv`
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }, (err, user) => {
          if (user) {
            done(err, user);
          } else {
            let username;
            const re = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,9}$/;
            if (re.test(profile.displayName)) {
              username = profile.displayName;
            } else {
              username = "User" + `${randtoken.generate(4)}`;
            }
            new User({
              username,
              email: profile.emails[0].value,
              role: Role.User,
              isVerified: true,
              googleId: profile.id
            })
              .save()
              .then(user => {
                done(err, user);
              });
          }
        });
      }
    )
  );
}

function createToken(data) {
  const token = jwt.sign({ id: data._id, role: data.role }, config.jwt.secret, {
    expiresIn: config.jwt.expiration
  });

  return token;
}

module.exports = {
  initialize: () => passport.initialize(),
  authenticate: () => passport.authenticate("jwt", { session: false }),
  authenticateGoogle: () =>
    passport.authenticate("google-token", {
      session: false,
      scope: ["profile", "email"],
      state: "myState"
    }),
  jwtStrategy,
  googleStrategy,
  createToken
};
