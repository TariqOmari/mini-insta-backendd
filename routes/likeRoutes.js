const express = require("express");
const router = express.Router();
const { toggleLike, getAllLikes } = require("../controller/likeController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/likes/:postId
router.post("/:postId", authMiddleware, toggleLike);
router.get("/", authMiddleware, getAllLikes);

module.exports = router;
