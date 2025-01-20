const EmailTemplate = require("../models/emailTemplate");
const path = require("path");
const fs = require("fs");

// Fetch the email layout HTML
exports.getEmailLayout = (req, res) => {
  const filePath = path.join(__dirname, "../public/layout.html");
  res.sendFile(filePath);
};

// Upload image
// exports.uploadImage = (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }
//   res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
// };

exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const serverUrl = "http://localhost:5000"; // Replace with your actual server's URL
  res.status(200).json({ imageUrl: `${serverUrl}/uploads/${req.file.filename}` });
};


// Save email configuration to the database
exports.uploadEmailConfig = async (req, res) => {
  try {
    const emailConfig = new EmailTemplate(req.body);
    await emailConfig.save();
    res.status(201).json({ message: "Email configuration saved", emailConfig });
  } catch (err) {
    res.status(500).json({ message: "Error saving email config", error: err });
  }
};

// Render and download the template
exports.renderAndDownloadTemplate = async (req, res) => {
  try {
    const { title, content, footer, imageUrls } = req.body;
    const filePath = path.join(__dirname, "../public/layout.html");
    let layout = fs.readFileSync(filePath, "utf8");

    // Replace placeholders in the layout
    layout = layout.replace("{{title}}", title)
                   .replace("{{content}}", content)
                   .replace("{{footer}}", footer)
                   .replace("{{imageUrls}}", imageUrls.map(url => `<img src="${url}" />`).join(""));

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Disposition", "attachment; filename=email-template.html");
    res.send(layout);
  } catch (err) {
    res.status(500).json({ message: "Error rendering template", error: err });
  }
};
