const fs = require("fs");
const path = require("path");

export default async function handler(req, res) {
  try {
    const { title, content, footer, imageUrls } = req.body;
    const filePath = path.resolve("./public/layout.html");
    let layout = fs.readFileSync(filePath, "utf8");

    layout = layout
      .replace("{{title}}", title)
      .replace("{{content}}", content)
      .replace("{{footer}}", footer)
      .replace("{{imageUrls}}", imageUrls.map(url => `<img src="${url}" />`).join(""));

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Disposition", "attachment; filename=email-template.html");
    res.send(layout);
  } catch (err) {
    res.status(500).json({ message: "Error rendering template", error: err });
  }
}
