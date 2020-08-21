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
    // Destructure request
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

  // Add an assessment to a unit
  app.post("/units/add_assessment", (req, res) => {
    // Destructure request
    const { id, unit, name, weight, dueDate } = req.body;

    async function addAssessment() {
      // Get the model of the user being followed
      const response = await User.findByIdAndUpdate(req.user._id, {
        $addToSet: {
          assessments: {
            id,
            unit,
            name,
            weight,
            dueDate,
            isComplete: false,
          },
        },
      });

      res.send(response);
    }

    addAssessment();
  });

  // Remove an assessment from a unit
  app.post("/units/remove_assessment", (req, res) => {
    const { assessmentId } = req.body;

    async function removeAssessment() {
      // Get the model of the user being followed
      const response = await User.findByIdAndUpdate(req.user._id, {
        $pull: {
          assessments: {
            id: req.body.assessmentId,
          },
        },
      });

      res.send(response);
    }

    removeAssessment();
  });

  // Toggle an assessment's isComplete status
  app.post("/units/toggle_assessment", (req, res) => {
    const { assessmentId, toggleType } = req.body;

    async function toggleAssessment() {
      // Get the model of the user being followed
      const response = await User.updateOne(
        { "assessments.id": assessmentId },
        {
          $set: {
            "assessments.$.isComplete": toggleType,
          },
        }
      );

      res.send(response);
    }

    toggleAssessment();
  });
};
