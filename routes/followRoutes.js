const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Pulling the 'User' model class out of mongoose as an object
const User = mongoose.model("users");

module.exports = (app) => {
  /* --- FOLLOW ACCOUNT --- */
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

  /* --- UNFOLLOW ACCOUNT --- */
  app.post("/follows/remove", (req, res) => {
    // Username of the user being unfollowed
    const unfollowedUsername = req.body.unfollowedUsername;
    // Username and ID of the unfollower
    const unfollowerUsername = req.user.username;
    const unfollowerId = req.user._id.toString();

    async function unfollowAccount() {
      // Get the model of the user being unfollowed
      const unfollowedUser = await User.findOne({
        username: unfollowedUsername,
      });

      // Check if the user being unfollowed exists
      if (unfollowedUser) {
        const unfollowedId = unfollowedUser._id.toString();
        // Add unfollowed account's ID to user's unfollowingIds array.
        await User.findByIdAndUpdate(unfollowerId, {
          $pull: {
            following: { id: unfollowedId, username: unfollowedUsername },
          },
        });
        // Add unfollowing account's ID to unfollowed account's unfollowerIds array.
        await User.findByIdAndUpdate(unfollowedUser._id, {
          $pull: {
            unfollowers: { id: unfollowerId, username: unfollowerUsername },
          },
        });
      }
      res.send(unfollowedUser);
    }

    unfollowAccount();
  });
};
