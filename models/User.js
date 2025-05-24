const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { 
      type: String, 
      required: true, 
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] 
    },
  password: { type: String, required: true },
  profilePhoto: { type: String },
   status: {
    type: String,
    enum: ["online", "offline"],
    default: "offline"
  } 
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
