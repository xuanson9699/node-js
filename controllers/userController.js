import { validationResult } from "express-validator";
import { userRepositories } from "../repositories/index.js";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  userRepositories.login({ email, password });
};

const register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }
  const { email, password, name, phoneNumber, gender, address } = req.body;
  userRepositories.register({ email, password, name, phoneNumber, gender, address });
  res.status(HttpStatusCode.INSERT_OK).json({
    message: "success"
  })
};

export default { login, register };
