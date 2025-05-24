const Comment = require("../models/comment"); 

const createComment = async (req, res) => {
  try {
    const { caption } = req.body;
    const userId = req.user.id;
    const postId = req.params.postId;
    const media = req.file ? req.file.path : null;

    let mediaType = "text";
    if (media) {
      mediaType = media.endsWith(".mp4") ? "video" : "photo";
    }

    const comment = await Comment.create({
      postId,
      userId,
      caption,
      mediaUrl: media,
      mediaType,
    });

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ deletedAt: null })
      .populate({
        path: "userId",
        select: "username email profilePic status",
      })
      .populate({
        path: "postId",
        select: "_id caption",
      })
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;

    const comment = await Comment.findOne({ _id: commentId, userId });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found or not authorized" });
    }

    comment.deletedAt = new Date();
    await comment.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update comment (caption + media)
const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;
    const { caption } = req.body;
    const media = req.file ? req.file.path : null;

    const comment = await Comment.findOne({ _id: commentId, userId });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found or not authorized" });
    }

    let mediaType = comment.mediaType;
    if (media) {
      mediaType = media.endsWith(".mp4") ? "video" : "photo";
    }

    comment.caption = caption || comment.caption;
    comment.mediaUrl = media || comment.mediaUrl;
    comment.mediaType = media ? mediaType : comment.mediaType;

    await comment.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { createComment, getAllComments, deleteComment, updateComment };




