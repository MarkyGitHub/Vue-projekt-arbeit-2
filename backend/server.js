import express from "express";
import { formidable } from "formidable"; // Updated import
import path from "path";
import fs from "fs";

// Define upload directory
const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const server = express();

// Enable CORS for cross-origin requests
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // Vue app's origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Serve static files
server.use("/uploads", express.static(uploadDir));

// File upload route
server.post("/uploadImage", (req, res) => {
  const form = formidable({
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Formidable error:", err);
      return res.status(500).json({ error: "File upload failed" });
    }

    console.log("Parsed fields:", fields);
    console.log("Parsed files:", files);

    // Check if 'image' field exists and handle the array
    const uploadedFile = Array.isArray(files.image)
      ? files.image[0]
      : files.image;

    if (!uploadedFile || !uploadedFile.filepath) {
      console.error("No valid file uploaded");
      return res.status(400).json({ error: "File was not uploaded correctly" });
    }

    const filePath = uploadedFile.filepath;
    const fileName = path.basename(filePath);
    const fileUrl = `http://localhost:3000/uploads/${fileName}`;

    res.status(200).json({ fileUrl });
  });
});

// Start the server
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
