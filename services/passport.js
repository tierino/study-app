const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Pulling the 'User' model class out of mongoose as an object
const User = mongoose.model("users");

// User model instance --> ID
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ID --> User model instance
passport.deserializeUser((id, done) => {
  // Chain on .then because findById returns a promise
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // User.findOne returns a promise, so use 'then' here
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // User already exists
        // Call done with the found user
        done(null, existingUser);
      } else {
        // Make a new user
        // Call done with the new user
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      }
    }
  )
);
