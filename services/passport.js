const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
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
      const existingUser = await User.findOne({
        googleId: profile.id,
      });
      if (existingUser) {
        // User already exists
        // Call done with the found user
        done(null, existingUser);
      } else {
        // Make a new user
        // Call done with the new user
        const user = await new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          givenName: profile.name.givenName,
        }).save();
        done(null, user);
      }
    }
  )
);

/******************
 * LOCAL STRATEGY
 ******************/

// SIGN IN
passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
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
  })
);

// SIGN UP
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      // Find a user whose email is the same as the forms email
      User.findOne({ email: email }, function (err, user) {
        if (err) return done(err);

        // If a user with email does exist, return an error
        if (user) {
          return done(null, false, { error: "Email in use" });
        }

        // Else, create and save user record
        user = new User({
          email: email,
          password: password,
          givenName: req.body.name,
        });

        user.save(function (err) {
          if (err) throw err;
          return done(null, user);
        });
      });
    }
  )
);
