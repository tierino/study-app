const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Pulling the 'User' model class out of mongoose as an object
const User = mongoose.model("users");

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
