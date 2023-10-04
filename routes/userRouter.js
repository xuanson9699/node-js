import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("send users");
});

router.post("/register", body("email").isEmail(), body("password").isLength({ min: 5 }), (req, res) => {
  userController.register(req, res);
});

router.post("/login", body("email").isEmail(), body("password").isLength({ min: 5 }), (req, res) => {
  userController.login(req, res);
});

export default router;
