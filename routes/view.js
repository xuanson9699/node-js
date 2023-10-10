import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/upload-file", (req, res) => {
  const filePath = path.join(__dirname, "../views/index.html");
  res.sendFile(filePath);
});

export default router;
