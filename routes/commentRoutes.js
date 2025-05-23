const express = require("express");
const router = express.Router();
const { createComment } = require("../controller/commentController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// POST /api/comments/:postId
router.post("/:postId", authMiddleware, upload.single("media"), createComment);

module.exports = router;
