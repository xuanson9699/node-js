import { validationResult } from "express-validator";

const getAllStudents = (req, res) => {
  res.status(200).json({
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
