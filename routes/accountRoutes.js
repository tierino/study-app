const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = require("../models/User");

module.exports = (app) => {
  app.post("/account/change_name", (req, res) => {
    const newName = req.body.newName;
    const id = req.user._id;

    async function changeName() {
      const response = await User.findByIdAndUpdate(id, {
        givenName: newName,
      });
      res.send(response);
    }

    changeName();
  });

  app.get("/account/user", (req, res) => {
    res.send(req.user);
  });
};
