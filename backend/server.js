import express from "express";
import path from "path";
import formidable from "formidable";
import fs from "fs";

const server = express();
const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve Vue build files
const staticPath = path.join(__dirname, "frontend", "dist");
server.use(express.static(staticPath));

// File upload endpoint
server.post("/uploadImage", (req, res) => {
  const form = formidable({ uploadDir, keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send("Error uploading file");
      return;
    }
    const uploadedFile = files.image;
    const fileUrl = `/uploads/${uploadedFile.newFilename}`;
    res.json({ fileUrl });
  });
});

// Fallback to Vue app for unmatched routes
server.get("*", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
