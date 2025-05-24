const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createComment,
  getAllComments,
  deleteComment,
  updateComment,
} = require("../controller/commentController");
const authMiddleware = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// ✅ Create a comment on a post
router.post("/:postId", authMiddleware, upload.single("media"), createComment);

// ✅ Get all comments (for admin or public feed)
router.get("/", getAllComments);

// ✅ Update a comment
router.put("/:id", authMiddleware, upload.single("media"), updateComment);

// ✅ Delete a comment
router.delete("/:id", authMiddleware, deleteComment);

module.exports = router;
