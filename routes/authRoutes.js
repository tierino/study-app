const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Pulling the 'User' model class out of mongoose as an object
const User = mongoose.model("users");

module.exports = (app) => {
  // Bring user into OAuth flow
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // Get user profile (after a sign-in)
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/home");
    }
  );

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/signout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
