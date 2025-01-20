const path = require("path");

export default function handler(req, res) {
  const filePath = path.resolve("./public/layout.html");
  res.sendFile(filePath);
}
