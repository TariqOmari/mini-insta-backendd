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



const getAllPostsWithUserDetails = async (req, res) => {
  try {
    const posts = await Post.find({ deletedAt: null })
      .populate("userId", "username email status profilePhoto")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};



const deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    const post = await Post.findOne({ _id: postId, userId });

    if (!post) {
      return res.status(404).json({ message: "Post not found or not authorized" });
    }

    post.deletedAt = new Date();
    await post.save();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update a post (caption and media optional)
const updatePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;
    const { caption } = req.body;

    const post = await Post.findOne({ _id: postId, userId });

    if (!post) {
      return res.status(404).json({ message: "Post not found or not authorized" });
    }

    let mediaUrl = post.mediaUrl;
    let mediaType = post.mediaType;

    if (req.file) {
      mediaUrl = req.file.path;
      if (req.file.mimetype.startsWith("image/")) mediaType = "photo";
      else if (req.file.mimetype.startsWith("video/")) mediaType = "video";
    }

    post.caption = caption || post.caption;
    post.mediaUrl = mediaUrl;
    post.mediaType = mediaType;

    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




module.exports = { createPost, getUserPosts, getAllPostsWithUserDetails, deletePost, updatePost };
