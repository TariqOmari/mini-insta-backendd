const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getAllUsers } = require("../controller/authController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.get("/users", getAllUsers);
router.post("/signup", upload.single("profilePhoto"), registerUser);
router.post("/login", loginUser);

module.exports = router;
