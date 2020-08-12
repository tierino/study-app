const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  author: Object,
  content: String,
  replyingTo: Object,
  likes: Array,
  comments: Array,
  date: Number,
});

// Load the postSchema into mongoose
mongoose.model("posts", postSchema);
