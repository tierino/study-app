const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = require("../models/User");

module.exports = (app) => {
  app.post("/account/changeUsername", (req, res) => {
    const newUsername = req.body.newUsername;
    const id = req.user._id;

    async function changeUsername() {
      const response = await User.findByIdAndUpdate(id, {
        username: newUsername,
      });
      res.send(response);
    }

    changeUsername();
  });
};
