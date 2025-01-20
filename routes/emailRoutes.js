const express = require("express");
const multer = require("multer");
const {
  getEmailLayout,
  uploadImage,
  uploadEmailConfig,
  renderAndDownloadTemplate,
} = require("../controllers/emailController");

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.get("/getEmailLayout", getEmailLayout);
router.post("/uploadImage", upload.single("image"), uploadImage);
router.post("/uploadEmailConfig", uploadEmailConfig);
router.post("/renderAndDownloadTemplate", renderAndDownloadTemplate);

module.exports = router;
