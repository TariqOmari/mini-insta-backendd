const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createPost,
  getUserPosts,
  getUserPostsWithDetails,
  deletePost,
  updatePost,
} = require("../controller/postController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// ✅ Create post
router.post("/", authMiddleware, upload.single("media"), createPost);

// ✅ Get own posts
router.get("/me", authMiddleware, getUserPosts);

// ✅ Get own posts with user info
router.get("/me/details", authMiddleware, getUserPostsWithDetails);

// ✅ Update post
router.put("/:id", authMiddleware, upload.single("media"), updatePost);

// ✅ Delete post
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
