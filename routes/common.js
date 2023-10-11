import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import { commonController } from "../controllers/index.js";
import fileExtLimiter from "../middleware/fileExtLimiter.js";
import fileSizeLimiter from "../middleware/fileSizeLimiter.js";
import filesPayloadExists from "../middleware/filesPayloadExists.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  (req, res) => {
    const files = req.files;

    Object.keys(files).forEach((key) => {
      const filepath = path.join(__dirname, "../files", files[key].name);
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });
    return res.json({ status: "success", message: Object.keys(files).toString() });
  }
);

router.get("/export-excel", (req, res) => {
  commonController.exportExcel(req, res)
});

export default router;
