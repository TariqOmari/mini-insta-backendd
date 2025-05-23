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

module.exports = { createComment };
