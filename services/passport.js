const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

const User = require("../models/User");
const keys = require("../config/keys");

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

/******************
 * GOOGLE STRATEGY
 ******************/

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
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

/******************
 * LOCAL STRATEGY
 ******************/
const localOptions = { usernameField: "email" }; // Says to look at email property to find username
const localLogin = new LocalStrategy(localOptions, function (
  email,
  password,
  done
) {
  try {
    // Verify this email and password
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      // User not found
      if (!user) {
        return done(null, false);
      }

      // Compare passwords
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return done(err);
        }
        // Password does not match
        if (!isMatch) {
          return done(null, false);
        }
        // User found and password matching
        return done(null, user);
      });
    });
  } catch (e) {
    console.log(e);
  }
});

// Set up options for JWT Strategy
const jwtOptions = {
  // Attempt to get token from a header called 'authorization'
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: keys.jwtSecret,
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // See if the user ID in the payload exists in our db
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      // If user exists, call 'done' with that user - authenticated
      done(null, user);
    } else {
      // Else, call 'done' without a user object - not authenticated
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
