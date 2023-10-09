import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  userController.getAllUser(req, res);
});

router.post("/register", body("email").isEmail(), body("password").isLength({ min: 5 }), (req, res) => {
  userController.register(req, res);
});

router.post("/login", body("email").isEmail(), body("password").isLength({ min: 5 }), (req, res) => {
  userController.login(req, res);
});

router.get("/profile", (req, res, next) => {
  userController.profile(req, res, next);
});

export default router;
