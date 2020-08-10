const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  username: { type: String, unique: true, lowercase: true },
  following: Array,
  followers: Array,
});

// Load the userSchema into mongoose
mongoose.model("users", userSchema);
