const Like = require("../models/Like"); 

const toggleLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;

    const existingLike = await Like.findOne({ userId, postId });

    if (existingLike) {
   
      await Like.findByIdAndDelete(existingLike._id);
      return res.status(200).json({ message: "Post unliked" });
    } else {
     
      const like = await Like.create({ userId, postId });
      return res.status(201).json({ message: "Post liked", like });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllLikes = async (req, res) => {
  try {
    const likes = await Like.find()
      .populate({
        path: "userId",
        select: "username email profilePic status",
      })
      .populate({
        path: "postId",
        select: "_id caption",
      })
      .sort({ createdAt: -1 });

    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { toggleLike, getAllLikes };
