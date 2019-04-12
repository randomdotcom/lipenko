const passport = require("passport");

const { ExtractJwt, Strategy } = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const VKontakteStrategy = require("passport-vkontakte").Strategy;
const GitHubStrategy = require("passport-github").Strategy;

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
    console.log(token)
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
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: "/api/clients/google/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }, (err, user) => {
          if (user) {
            done(err, user);
          } else {
            new User({
              username: profile.displayName,
              email: profile.emails[0].value,
              role: Role.User,
              isVerified: false,
              verificationCode: randtoken.generate(16),
              googleId: profile.id
            })
              .save()
              .then(user => {
                console.log(`new user from google: ${user}`);
                done(null, user);
              });
          }
        });
      }
    )
  );
}

function vkontakteStrategy() {
  passport.use(
    new VKontakteStrategy(
      {
        clientID: `${process.env.VK_CLIENT_ID}`,
        clientSecret: `${process.env.VK_CLIENT_SECRET}`,
        callbackURL: "/api/clients/vk/callback"
      },
      (accessToken, refreshToken, params, profile, done) => {
        if (!params.email) throw new Error('Нет почты');
        User.findOne({ vkontakteId: profile.id }, (err, user) => {
          if (user) {
            done(err, user);
          } else {
            new User({
              username: profile.username,
              email: params.email,
              role: Role.User,
              isVerified: false,
              verificationCode: randtoken.generate(16),
              vkontakteId: profile.id
            })
              .save()
              .then(user => {
                console.log(`new user from vk: ${user}`);
                done(null, user);
              });
          }
        });
      }
    )
  );
}

function githubStrategy() {
  passport.use(
    new GitHubStrategy(
      {
        clientID: `${process.env.GITHUB_CLIENT_ID}`,
        clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
        callbackURL: "/api/clients/github/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        if (!profile.email) throw new Error('Нет почты');
        User.findOne({ githubId: profile.id }, (err, user) => {
          if (user) {
            done(err, user);
          } else {
            new User({
              username: profile.login,
              email: profile.email,
              role: Role.User,
              isVerified: false,
              verificationCode: randtoken.generate(16),
              githubId: profile.id
            })
              .save()
              .then(user => {
                console.log(`new user from google: ${user}`);
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
    passport.authenticate("google", {
      session: false,
      scope: ["email", "profile"]
    }),
  authenticateGitHub: () =>
    passport.authenticate("github", {
      session: false,
      scope: ["email"]
    }),
  authenticateVKontakte: () =>
    passport.authenticate("vkontakte", {
      session: false,
      scope: ["email"]
    }),
  jwtStrategy,
  googleStrategy,
  githubStrategy,
  vkontakteStrategy,
  createToken
};
