import express from "express";
import { studentController } from "../controllers/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  studentController.getAllStudents(req, res);
});

router.get("/:id", (req, res) => {
  studentController.getDetailStudent(req, res);
});

router.post("/", (req, res) => {
  studentController.addStudent(req, res);
});

router.delete("/delete", (req, res) => {
  studentController.deleteStudent(req, res);
});

export default router;
