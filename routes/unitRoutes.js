const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = require("../models/User");

module.exports = (app) => {
  // Add a unit
  app.post("/units/add", (req, res) => {
    // Username of the user being followed
    const { name } = req.body;

    async function addUnit() {
      // Get the model of the user being followed
      const response = await User.findByIdAndUpdate(req.user._id, {
        $addToSet: {
          units: { name, grade: 0.0, progress: 0.0, assessments: [] },
        },
      });

      res.send(response);
    }

    addUnit();
  });

  // Remove a unit
  app.post("/units/remove", (req, res) => {
    // Username of the user being followed
    const { name } = req.body;

    async function removeUnit() {
      // Get the model of the user being followed
      const response = await User.findByIdAndUpdate(req.user._id, {
        $pull: {
          units: { name, grade: 0.0, progress: 0.0, assessments: [] },
        },
      });

      res.send(response);
    }

    removeUnit();
  });
};
