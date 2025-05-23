const Post = require("../models/post");

const createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { caption } = req.body;
    let mediaUrl = null;
    let mediaType = null;

    if (req.file) {
      mediaUrl = req.file.path; 
      if (req.file.mimetype.startsWith("image/")) mediaType = "photo";
      else if (req.file.mimetype.startsWith("video/")) mediaType = "video";
    }

    const newPost = await Post.create({
      userId,
      caption,
      mediaUrl,
      mediaType,
    });

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await Post.find({ userId, deletedAt: null }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPost, getUserPosts };
