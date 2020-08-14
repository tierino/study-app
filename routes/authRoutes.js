const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");

const Authentication = require("../controllers/authentication");
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = (app) => {
  /***********************
   * OAUTH AUTHENTICATION
   ***********************/

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

  /***********************
   * LOCAL AUTHENTICATION
   ***********************/

  app.post("/auth/signin", requireSignin, Authentication.signin);

  app.post("/auth/signup", Authentication.signup);

  app.get("/users/current_user", (req, res) => {
    res.send(req.user);
    console.log(req.user);
  });

  app.get("/auth/signout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
