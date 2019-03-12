var passport = require('passport'),
    GoogleStrategy = require('passport-google-auth').Strategy;

passport.use(new GoogleOAuth2Strategy({
    clientId: '123-456-789',
    clientSecret: 'shhh-its-a-secret',
    callbackURL: 'https://www.example.com/auth/example/callback'
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile)
        User.findOrCreate({ googleId: profile.id }, (err, user) => {
            if (user) {
                console.log()
                done(err, user);
            } else {
                new User({
                    username: profile.username,
                    email: profile.emails[0].value,
                    role: Role.User,
                    isVerified: true,
                    googleId: profile.id
                }).save().then(user => {
                    console.log(`new user from google: ${user}`);
                    done(null, user);
                })

            }
        });
    }
));