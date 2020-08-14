const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = require("../models/User");

// Pulling the 'Post' model class out of mongoose as an object
const Post = mongoose.model("posts");

module.exports = (app) => {
  app.post("/posts/create", (req, res) => {
    const content = req.body.content;
    const author = req.user;
    // const authorId = req.user._id.toString();

    async function createPost() {
      // Create the post in MongoDB
      const response = await Post.create({
        author,
        content,
        date: Date.now(),
      });

      // Not working
      await User.findByIdAndUpdate(author._id, {
        $push: {
          posts: { author, content, date: Date.now() },
        },
      });

      res.send(response.data);
    }

    createPost();
  });
};
