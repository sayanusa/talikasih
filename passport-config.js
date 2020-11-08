const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
      done(null, user);
  });


// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: "324543708739-sb2kpm0qrh3o2bu3or41llvhb2ekaek3.apps.googleusercontent.com",
    clientSecret: "VQdlbHhM91A_ftPXS3L3ynNu",
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(token, tokenSecret, profile, done) {
        return done(null, profile);
  }
));

