const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Pulling the 'Post' model class out of mongoose as an object
const Post = mongoose.model("posts");

module.exports = (app) => {
  app.post("/posts/create", (req, res) => {
    const content = req.body.content;
    const author = req.user;
    // const authorId = req.user._id.toString();

    async function createPost() {
      const response = await Post.create({
        author,
        content,
      });
      res.send(response);
    }

    createPost();
  });

  app.post("/posts/feed", (req, res) => {
    // Retrieve a feed of posts
  });
};
