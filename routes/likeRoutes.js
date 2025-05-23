const express = require("express");
const router = express.Router();
const { toggleLike } = require("../controller/likeController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/likes/:postId
router.post("/:postId", authMiddleware, toggleLike);

module.exports = router;
