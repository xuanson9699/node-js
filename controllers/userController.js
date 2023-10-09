import { validationResult } from "express-validator";
import { userRepositories } from "../repositories/index.js";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    const token = await userRepositories.login({ email, password });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Login successfully",
      data: token
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }
  const { email, password, name, phoneNumber, gender, address, languages } = req.body;

  try {
    debugger;
    const user = await userRepositories.register({ email, password, name, phoneNumber, gender, address, languages });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "success",
      data: user,
    });
  } catch (exception) {
    debugger;
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const list = await userRepositories.getAllUser();
    res.status(HttpStatusCode.OK).json({
      message: "success",
      data: list,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const profile = async (req, res) => {
  try {
    const userProfile = await userRepositories.profile(req, res);
    debugger;
    res.status(HttpStatusCode.OK).json({
      message: "success",
      data: userProfile,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

export default { login, register, getAllUser, profile };
