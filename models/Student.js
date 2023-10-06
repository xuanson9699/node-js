import mongoose, { Schema, ObjectId } from "mongoose";
import  isEmail  from "validator";

const Student = mongoose.model(
  "Student",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      require: true,
      validate: {
        validator: (value) => value.length > 3,
        message: "Username must be at least 3 charaters",
      },
    },
    email: {
      type: String,
      require: true,
      validate: {
        validator: (value) => isEmail,
        message: "Email is incorrect format",
      },
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  })
);

export default Student;
