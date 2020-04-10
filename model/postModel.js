const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: { type: String, require: true },
  message: { type: String, require: true }
});

const postSchema = new Schema({
  title: { type: String, require: true },
  user: { type: String, require: true },
  category: { type: String, require: true },
  description: { type: String, require: true },
  date: { type: String, default: Date.now, require: true },
  toExpire: { type: Boolean, default: true },
  expireAt: {
    type: Date,
    index: { expires: "3d" }
  },
  comment: [commentSchema]
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;