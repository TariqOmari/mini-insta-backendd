const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const { createPost, getUserPosts } = require("../controller/postController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });


router.post("/", authMiddleware, upload.single("media"), createPost);


router.get("/me", authMiddleware, getUserPosts);

module.exports = router;
