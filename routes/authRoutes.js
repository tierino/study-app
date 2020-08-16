const passport = require("passport");

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

  app.post("/auth/signin", passport.authenticate("local"), (req, res) => {
    res.send(req.user);
  });

  app.post(
    "/auth/signup",
    passport.authenticate("local-signup"),
    (req, res) => {
      res.send(req.user);
    }
  );

  /**********************
   * OTHER
   ***********************/

  app.get("/auth/signout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
