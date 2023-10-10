import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const filesPayloadExists = (req, res, next) => {
  if (!req.files) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ status: HttpStatusCode.BAD_REQUEST, message: "Missing files" });
  }
  next();
};

export default filesPayloadExists;
