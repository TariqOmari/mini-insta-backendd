const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    caption: { type: String },
    mediaUrl: { type: String },
    mediaType: {
      type: String,
      enum: ["text", "photo", "video"],
      default: "text",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
