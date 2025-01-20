const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
  }),
}).single("image");

export default async function handler(req, res) {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error uploading file", error: err });
    }
    const serverUrl = "https://backend-along-with-upload-wldp-31ucjs8ua.vercel.app";
    res.status(200).json({ imageUrl: `${serverUrl}/uploads/${req.file.filename}` });
  });
}
