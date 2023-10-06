import { validationResult } from "express-validator";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const getAllStudents = (req, res) => {
  res.status(HttpStatusCode.OK).json({
    message: "Success",
    data: [{ id: 1, name: "name" }],
  });
};

const getDetailStudent = (req, res) => {};

const deleteStudent = (req, res) => {
  res.send("deleteStudent");
};

const addStudent = (req, res) => {
  res.send("addStudent");
};

export default { getAllStudents, getDetailStudent, deleteStudent, addStudent };
