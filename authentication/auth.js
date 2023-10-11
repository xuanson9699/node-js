import jwt from "jsonwebtoken";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const checkToken = (req, res, next) => {
  next();
    return;
  if (
    req.url.toLowerCase().trim() === "/users/login".toLowerCase().trim() ||
    req.url.toLowerCase().trim() === "/users/register".toLowerCase().trim() ||
    req.url.toLowerCase().trim() === "/view/upload-file".toLowerCase().trim() ||
    req.url.toLowerCase().trim() === "/upload".toLowerCase().trim() ||
    req.url.split("/")[1].toLowerCase().trim() === "files".toLowerCase().trim()
  ) {
    next();
    return;
  }
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    const jwtObject = jwt.verify(token, process.env.SECRET_KEY);
    const isExpired = Date.now() >= jwtObject.exp * 1000;
    if (isExpired) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Token is expired",
      });
      res.end();
      return;
    }
    next();
    return jwtObject;
  } catch (exception) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: exception.toString(),
    });
  }
  // debugger
};

const getUserByToken = (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    const jwtObject = jwt.verify(token, process.env.SECRET_KEY);
    return { email: jwtObject.email };
  } catch (exception) {}
};

export { checkToken, getUserByToken };
