const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Pulling the 'Post' model class out of mongoose as an object
const Post = mongoose.model("posts");
const User = mongoose.model("users");

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
          recentPosts: { author, content, date: Date.now() },
          $slice: -10,
        },
      });

      res.send(response.data);
    }

    createPost();
  });

  app.get("/posts/from_user", (req, res) => {
    const user = req.body.user;

    async function fetchPosts() {
      const user = await User.findOne({ username: user.username });

      console.log(user.postIds);
    }

    fetchPosts();
  });
};
