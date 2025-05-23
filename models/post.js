const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  caption: { type: String, default: "" },
  mediaUrl: { type: String, default: null }, 
  mediaType: { type: String, enum: ["photo", "video", null], default: null },
  deletedAt: { type: Date, default: null } 
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
