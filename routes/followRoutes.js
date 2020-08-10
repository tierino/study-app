const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Pulling the 'User' model class out of mongoose as an object
const User = mongoose.model("users");

module.exports = (app) => {
  app.post("/follows/new", (req, res) => {
    // Username of the user being followed
    const followedUsername = req.body.followedUsername;
    // Username and ID of the follower
    const followerUsername = req.user.username;
    const followerId = req.user._id.toString();

    async function followAccount() {
      // Get the model of the user being followed
      const followedUser = await User.findOne({ username: followedUsername });

      // Check if the user being followed exists
      if (followedUser) {
        const followedId = followedUser._id.toString();
        // Add followed account's ID to user's followingIds array.
        await User.findByIdAndUpdate(followerId, {
          $addToSet: {
            following: { id: followedId, username: followedUsername },
          },
        });
        // Add following account's ID to followed account's followerIds array.
        await User.findByIdAndUpdate(followedUser._id, {
          $addToSet: {
            followers: { id: followerId, username: followerUsername },
          },
        });
      }
      res.send(followedUser);
    }

    followAccount();
  });
};
