const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middelware");
const { uploadImage } = require("../controllers/profile.controllers");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", authMiddleware, upload.single("file"), uploadImage);

module.exports = router;
