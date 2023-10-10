import path from "path";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    const files = req.files;

    const fileExtensions = [];
    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    // Are the file extension allowed?
    const allowed = fileExtensions.every((ext) => allowedExtArray.includes(ext));

    if (!allowed) {
      const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(",", ", ");

      return res.status(HttpStatusCode.UNPROCESSABLE_CONTENT).json({ status: "error", message });
    }

    next();
  };
};

export default fileExtLimiter;
